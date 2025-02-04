package gameplay

import (
	"testing"

	"github.com/domino14/liwords/pkg/common"
	"github.com/domino14/liwords/pkg/config"
	"github.com/matryer/is"
)

func TestCalculateReturnedTiles(t *testing.T) {
	is := is.New(t)
	cfg := &config.Config{MacondoConfig: common.DefaultConfig}

	testcases := []struct {
		letdist          string
		playerRack       string
		lastEventRack    string
		lastEventTiles   string
		expectedReturned string
	}{
		{"english", "ABCCDEF", "CCDJMUY", "JUM.Y", "ABEF"},
		{"english", "ZY??YVA", "VYAYNKE", "KA.VYEN", "??AVYZ"},
		{"english", "BEFITAR", "DANGLES", "GEN..DL.A....S", "ABEFIRT"},
	}

	for _, tc := range testcases {
		tiles, err := calculateReturnedTiles(cfg, tc.letdist, tc.playerRack, tc.lastEventRack, tc.lastEventTiles)
		is.NoErr(err)
		is.Equal(tiles, tc.expectedReturned)
	}

}
