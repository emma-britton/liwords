package glicko

import (
	"math"
)

const (
	InitialRating               int     = 1500
	InitialVolatility           float64 = 0.06
	MaximumVolatility           float64 = 0.1
	InitialRatingDeviation      int     = 350
	MinimumRatingDeviation      int     = 75
	MaximumRatingDeviation      int     = 350
	VolatilityDeltaConstraint   float64 = 0.3
	GlickoToGlicko225Conversion float64 = 173.7178
	ConvergenceTolerance        float64 = 0.000001
	SpreadScaling               int     = 100
	WinBoost                    float64 = 0.15
	K                           float64 = (float64(4*SpreadScaling) * WinBoost) / (1 - (2 * WinBoost))
	RatingPeriodinSeconds       int     = 60 * 60 * 24 * 4
)

func Rate(
	playerUnscaledRating float64,
	playerUnscaledRatingDeviation float64,
	playerVolatility float64,
	opponentUnscaledRating float64,
	opponentUnscaledRatingDeviation float64,
	spread int,
	secondsSinceLastGame int) (float64, float64, float64) {

	// Step 1 of the Glicko-225 algorithm was performed upon account creation
	// Step 2 of the Glicko-225 algorithm is performed in MakeRatedPlayer
	playerRating := ConvertRatingToGlicko225(playerUnscaledRating)
	playerRatingDeviation := ConvertRatingDeviationToGlicko225(playerUnscaledRatingDeviation)
	opponentRating := ConvertRatingToGlicko225(opponentUnscaledRating)
	opponentRatingDeviation := ConvertRatingDeviationToGlicko225(opponentUnscaledRatingDeviation)

	// Precompute these values for efficiency
	expectedValue := expectedValue(playerRating, opponentRating, opponentRatingDeviation)
	opponentAdjustedRatingDeviation := adjustedRatingDeviation(opponentRatingDeviation)

	// Step 3 of the Glicko-225 algorithm
	variance := 1 / Variance(opponentAdjustedRatingDeviation, expectedValue)

	// Step 4 of the Glicko-225 algorithm
	improvement := Improvement(opponentAdjustedRatingDeviation, expectedValue, spread)
	improvementDelta := variance * improvement

	// Step 5 of the Glicko-225 algorithm
	a := math.Log(math.Pow(playerVolatility, 2))
	A := a
	deltaSquared := math.Pow(improvementDelta, 2)
	rdSquared := math.Pow(playerRatingDeviation, 2)
	var B float64
	if deltaSquared > rdSquared+variance {
		B = math.Log(deltaSquared - rdSquared - variance)
	} else {
		k := 1
		B = a - (float64(k) * VolatilityDeltaConstraint)
		for iterativeHelper(B, deltaSquared, rdSquared, variance, a) < 0 {
			k = k + 1
			B = a - (float64(k) * VolatilityDeltaConstraint)
		}

	}

	fA := iterativeHelper(A, deltaSquared, rdSquared, variance, a)
	fB := iterativeHelper(B, deltaSquared, rdSquared, variance, a)

	for math.Abs(B-A) > ConvergenceTolerance {
		C := A + (((A - B) * fA) / (fB - fA))
		fC := iterativeHelper(C, deltaSquared, rdSquared, variance, a)
		if fB*fC < 0 {
			A = B
			fA = fB
		} else {
			fA = fA / 2
		}
		B = C
		fB = fC
	}

	newPlayerVolatility := math.Min(MaximumVolatility, math.Exp(A/2))

	// Step 6 of the Glicko-225 algorithm
	newPlayerRatingDeviation := math.Sqrt(rdSquared + ((float64(secondsSinceLastGame) / float64(RatingPeriodinSeconds)) * math.Pow(newPlayerVolatility, 2)))

	// Step 7 of the Glicko-225 algorithm
	newPlayerRatingDeviation = 1 / math.Sqrt((1/math.Pow(newPlayerRatingDeviation, 2))+1/variance)
	newPlayerRating := playerRating + (math.Pow(newPlayerRatingDeviation, 2) * improvement)

	// Step 8 of the Glicko-225 algorithm
	newPlayerRating = ConvertRatingFromGlicko225(newPlayerRating)
	newPlayerRatingDeviation = ConvertRatingDeviationFromGlicko225(newPlayerRatingDeviation)
	newPlayerRatingDeviation = math.Max(math.Min(newPlayerRatingDeviation, float64(MaximumRatingDeviation)), float64(MinimumRatingDeviation))

	return newPlayerRating, newPlayerRatingDeviation, newPlayerVolatility
}

func ConvertRatingToGlicko225(unscaledRating float64) float64 {
	return (unscaledRating - float64(InitialRating)) / GlickoToGlicko225Conversion
}

func ConvertRatingFromGlicko225(rating float64) float64 {
	return GlickoToGlicko225Conversion*rating + float64(InitialRating)
}

func ConvertRatingDeviationToGlicko225(unscaledRatingDeviation float64) float64 {
	return unscaledRatingDeviation / GlickoToGlicko225Conversion
}

func ConvertRatingDeviationFromGlicko225(ratingDeviation float64) float64 {
	return ratingDeviation * GlickoToGlicko225Conversion
}

func Variance(opponentAdjustedRatingDeviation float64, expectedValue float64) float64 {
	return math.Pow(opponentAdjustedRatingDeviation, 2) * expectedValue * (1 - expectedValue)
}

func Improvement(opponentAdjustedRatingDeviation float64, expectedValue float64, spread int) float64 {
	return opponentAdjustedRatingDeviation * ((boundedResult(float64(spread)/((2*float64(SpreadScaling))+K)+(float64(sign(spread))*WinBoost)) + 0.5) - expectedValue)
}

func boundedResult(result float64) float64 {
	boundedResult := result
	if boundedResult > 0.5 {
		boundedResult = 0.5
	} else if boundedResult < -0.5 {
		boundedResult = -0.5
	}
	return boundedResult
}

func iterativeHelper(x float64, deltaSquared float64, rdSquared float64, variance float64, a float64) float64 {
	ex := math.Exp(x)
	return (ex*(deltaSquared-rdSquared-variance-ex))/
		(2*math.Pow(rdSquared+variance+ex, 2)) -
		(x-a)/math.Pow(VolatilityDeltaConstraint, 2)
}

func adjustedRatingDeviation(ratingDeviation float64) float64 {
	return 1 / math.Sqrt(1+((3*math.Pow(ratingDeviation, 2))/math.Pow(math.Pi, 2)))
}

func expectedValue(playerRating float64, opponentRating float64, opponentAdjustedRatingDeviation float64) float64 {
	return 1 / (1 + math.Exp(-opponentAdjustedRatingDeviation*(playerRating-opponentRating)))
}

func sign(spread int) int {
	sign := 1
	if spread < 0 {
		sign = -1
	} else if spread == 0 {
		sign = 0
	}
	return sign
}
