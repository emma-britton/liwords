package board

import (
	"os"
	"testing"

	macondoconfig "github.com/domino14/macondo/config"
	"github.com/domino14/macondo/tilemapping"
	"github.com/matryer/is"
	"github.com/rs/zerolog"
)

var DataDir = os.Getenv("DATA_PATH")
var DefaultConfig = macondoconfig.Config{
	DataPath: DataDir,
}

func TestFormedWords(t *testing.T) {
	is := is.New(t)
	layout, err := GetBoardLayout("CrosswordGame")
	is.NoErr(err)

	b := NewBoard(layout)
	rm := tilemapping.EnglishAlphabet()

	setFromPlaintext(b, VsOxy, rm)

	mls, err := tilemapping.ToMachineLetters("OX.P...B..AZ..E", rm)
	is.NoErr(err)

	words, err := FormedWords(b, 0, 0, true, mls)
	is.NoErr(err)

	is.Equal(len(words), 8)
	// convert all words to user-visible
	uvWords := make([]string, 8)
	for idx, w := range words {
		uvWords[idx] = w.UserVisible(rm)
	}
	is.Equal(uvWords, []string{"OXYPHENBUTAZONE", "OPACIFYING", "XIS", "PREQUALIFIED", "BRAINWASHING",
		"AWAKENERS", "ZONETIME", "EJACULATING"})

}

func TestPlayMoveGiant(t *testing.T) {
	is := is.New(t)
	layout, err := GetBoardLayout("CrosswordGame")
	is.NoErr(err)

	dist, err := tilemapping.GetDistribution(&DefaultConfig, "english")
	is.NoErr(err)

	b := NewBoard(layout)
	rm := tilemapping.EnglishAlphabet()

	setFromPlaintext(b, VsOxy, rm)

	mls, err := tilemapping.ToMachineLetters("OX.P...B..AZ..E", rm)
	is.NoErr(err)

	score, err := PlayMove(b, "CrosswordGame", dist, mls, 0, 0, true)
	is.NoErr(err)
	is.Equal(score, int32(1780))
}

func TestMoveInBetween(t *testing.T) {
	is := is.New(t)
	layout, err := GetBoardLayout("CrosswordGame")
	is.NoErr(err)

	dist, err := tilemapping.GetDistribution(&DefaultConfig, "english")
	is.NoErr(err)

	b := NewBoard(layout)
	rm := tilemapping.EnglishAlphabet()

	setFromPlaintext(b, VsMatt, rm)

	mls, err := tilemapping.ToMachineLetters("TAEL", rm)
	is.NoErr(err)

	score, err := PlayMove(b, "CrosswordGame", dist, mls, 8, 10, true)
	is.NoErr(err)
	is.Equal(score, int32(38))
}

func TestToFENEmpty(t *testing.T) {
	is := is.New(t)
	layout, err := GetBoardLayout("CrosswordGame")
	is.NoErr(err)

	dist, err := tilemapping.GetDistribution(&DefaultConfig, "english")
	is.NoErr(err)

	b := NewBoard(layout)

	is.Equal(ToFEN(b, dist), "15/15/15/15/15/15/15/15/15/15/15/15/15/15/15")
}

func TestToFEN(t *testing.T) {
	is := is.New(t)
	layout, err := GetBoardLayout("CrosswordGame")
	is.NoErr(err)

	dist, err := tilemapping.GetDistribution(&DefaultConfig, "english")
	is.NoErr(err)

	b := NewBoard(layout)
	rm := tilemapping.EnglishAlphabet()

	setFromPlaintext(b, VsMatt, rm)

	is.Equal(ToFEN(b, dist),
		"7ZEP1F3/1FLUKY3R1R3/5EX2A1U3/2SCARIEST1I3/9TOT3/6GO1LO4/6OR1ETA3/6JABS1b3/5QI4A3/5I1N3N3/3ReSPOND1D3/1HOE3V3O3/1ENCOMIA3N3/7T7/3VENGED6")
}

func TestToFENCatalan(t *testing.T) {
	is := is.New(t)
	layout, err := GetBoardLayout("CrosswordGame")
	is.NoErr(err)

	dist, err := tilemapping.GetDistribution(&DefaultConfig, "catalan")
	is.NoErr(err)

	b := NewBoard(layout)

	b.Tiles[7*15+6] = 1
	b.Tiles[7*15+7] = 13
	b.Tiles[7*15+8] = 1

	is.Equal(ToFEN(b, dist), "15/15/15/15/15/15/15/6A[L·L]A6/15/15/15/15/15/15/15")
}

func BenchmarkPlayMove(b *testing.B) {
	layout, _ := GetBoardLayout("CrosswordGame")
	dist, _ := tilemapping.GetDistribution(&DefaultConfig, "english")
	bd := NewBoard(layout)
	rm := tilemapping.EnglishAlphabet()
	lv := zerolog.GlobalLevel()
	zerolog.SetGlobalLevel(zerolog.Disabled)
	defer zerolog.SetGlobalLevel(lv)

	// ~29us per operation on themonolith
	for i := 0; i < b.N; i++ {
		setFromPlaintext(bd, VsMatt, rm)
		mls, _ := tilemapping.ToMachineLetters("TAEL", rm)
		PlayMove(bd, "CrosswordGame", dist, mls, 8, 10, true)
	}
}
