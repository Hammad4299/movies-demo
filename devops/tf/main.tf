terraform {
  backend "s3" {
    bucket = "teraception-tf-state"
    region = "us-east-2"
    key    = "movies-demo"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.31.0"
    }
  }

  required_version = ">= 1.6.6"
}

provider "aws" {
  alias      = "us-east-2"
  region     = "us-east-2"
  access_key = var.access_key
  secret_key = var.secret_key
  profile    = var.profile

  default_tags {
    tags = {
      tf-workspace = terraform.workspace
      managed-by   = "terraform"
      project      = "terraform-shared"
      env          = var.environment
      environment  = var.environment
    }
  }
}




