variable "environment" {
  type = string
  validation {
    condition     = contains(["dev", "uat", "prod"], var.environment)
    error_message = "environment must be one of the following: dev, uat, prod"
  }
}

variable "access_key" {
  type        = string
  default     = null
  description = "aws access key"
}

variable "secret_key" {
  type        = string
  default     = null
  description = "aws secret key"
}
variable "profile" {
  type        = string
  default     = null
  description = "aws profile"
}

variable "infra_workspace_name" {
  type = string
}
