package utilities

import (
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/rs/zerolog/log"
)

func CustomResolver(service, region string, options ...interface{}) (aws.Endpoint, error) {
	if service == s3.ServiceID && os.Getenv("USE_LOCALSTACK_S3") == "1" {
		log.Debug().Str("service", "s3").Msg("using-localstack-endpoint")
		return aws.Endpoint{
			URL: "http://localstack:4566",
		}, nil
	}
	return aws.Endpoint{}, &aws.EndpointNotFoundError{}
}

func CustomClientOptions(o *s3.Options) {
	if os.Getenv("USE_LOCALSTACK_S3") == "1" {
		o.UsePathStyle = true
	}
}
