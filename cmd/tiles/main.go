package main

import (
	"context"
	"flag"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/domino14/liwords/pkg/memento"
	pb "github.com/domino14/liwords/rpc/api/proto/game_service"
	macondopb "github.com/domino14/macondo/gen/api/proto/macondo"
)

func GetGameHistory(id string) (*macondopb.GameHistory, error) {

	client := pb.NewGameMetadataServiceProtobufClient("https://woogles.io", &http.Client{})
	history, err := client.GetGameHistory(context.Background(), &pb.GameHistoryRequest{GameId: id})

	if err != nil {
		return &macondopb.GameHistory{}, err
	}
	return history.History, nil
}

func main() {
	flag.Usage = func() {
		fmt.Fprintf(flag.CommandLine.Output(), `usage of %s:

  params: gameId [n]
    fetch game from woogles.io
    example: hBQhT94n
    example: XgTRffsq 7
      n = number of events to process (one less than ?turn= examiner param)

params can be prefixed with these flags:
`, os.Args[0])
		flag.PrintDefaults()
	}

	badUsage := func(err error) {
		flag.Usage()
		panic(err)
	}

	var colorFlag = flag.String("color", "", "0 = use player 0's colors, 1 = use player 1's colors")
	var gifFlag = flag.Bool("gif", false, "generate animated gif")
	flag.Parse()
	args := flag.Args()

	var whichColor int
	switch *colorFlag {
	case "0":
		whichColor = 0
	case "1":
		whichColor = 1
	case "":
		whichColor = -1
	default:
		badUsage(fmt.Errorf("-color can only be 0 or 1 or \"\""))
	}

	if len(args) < 1 {
		badUsage(fmt.Errorf("not enough params"))
	}

	wf := memento.WhichFile{}
	wf.GameId = args[0]
	wf.WhichColor = whichColor
	outputFilename := wf.GameId

	var outputFilenameSuffix string
	if len(args) > 1 {
		numEvents, err := strconv.Atoi(args[1])
		if err != nil {
			panic(err)
		}
		wf.HasNextEventNum = true
		wf.NextEventNum = numEvents
		outputFilenameSuffix += fmt.Sprintf("-%v", wf.NextEventNum)
	}
	if *gifFlag {
		wf.FileType = "animated-gif"
		outputFilename += "-a"
		outputFilenameSuffix += ".gif"
	} else {
		wf.FileType = "png"
		outputFilenameSuffix += ".png"
	}
	outputFilename += outputFilenameSuffix

	t0 := time.Now()

	hist, err := GetGameHistory(wf.GameId)
	if err != nil {
		panic(err)
	}

	// Omit censoring.

	// Just following GameService.GetGameHistory although it doesn't matter.
	if hist.PlayState != macondopb.PlayState_GAME_OVER && !wf.HasNextEventNum {
		// This check is useless, GetGameHistory already checks for GAME_OVER.
		panic(fmt.Errorf("game is not over"))
	}

	if wf.HasNextEventNum && (wf.NextEventNum <= 0 || wf.NextEventNum > len(hist.Events)+1) {
		panic(fmt.Errorf("game only has %d events", len(hist.Events)))
	}

	t1 := time.Now()

	outputBytes, err := memento.RenderImage(hist, wf)
	if err != nil {
		panic(err)
	}

	t2 := time.Now()

	fmt.Printf("writing %d bytes\n", len(outputBytes))
	fmt.Println("downloading history", t1.Sub(t0))
	fmt.Println("rendering image", t2.Sub(t1))

	err = ioutil.WriteFile(outputFilename, outputBytes, 0644)
	if err != nil {
		panic(err)
	}
}
