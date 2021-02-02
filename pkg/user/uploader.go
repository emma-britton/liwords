package user

import (
    "bytes"
	b64 "encoding/base64"
	"context"
    "encoding/json"
    "errors"
	"io/ioutil"
	"net/http"
	"net/url"

	"github.com/rs/zerolog/log"
)

type UploadService interface {
	Upload(context.Context, string, []byte) (string, error)
}

type XTUploadService struct {
}

func NewXTUploadService() (*XTUploadService) {
	return &XTUploadService{}
}

type UploadResult struct {
    AvatarUrl    string   `json:"avatar_url,omitempty"`
}

// Upload takes in JPG bytes
func (s *XTUploadService) Upload(ctx context.Context, prefix string, data []byte) (string, error) {
	// Base-64 encode the image data and then URLEncode that.
	sEnc := url.QueryEscape(b64.StdEncoding.EncodeToString([]byte(data)))

	// Send the photo data as a parameter in the URL itself. This is terrible.
	url := "http://cross-tables.com/rest/uploadavatar.php?prefix=" + prefix + "&photobytes=" + sEnc

	resp, err := http.Get(url)
	if err != nil {
        return "", err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
        return "", errors.New("Unable to update avatar")
	}

    bodyBytes, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return "", err
    }

    r := bytes.NewReader(bodyBytes)
    decoder := json.NewDecoder(r)

    val := &UploadResult{}
    decodeErr := decoder.Decode(val)

	if decodeErr != nil {
		log.Error().Err(decodeErr)
	    return "", decodeErr
    }

	if len(val.AvatarUrl) == 0 {
        return "", errors.New("Unable to update avatar")
	}

	return val.AvatarUrl, nil
}