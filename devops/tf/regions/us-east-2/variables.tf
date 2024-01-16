variable "deployment_name" {
  type = string
}

variable "environment" {
  type = string
  validation {
    condition     = contains(["dev", "uat", "prod"], var.environment)
    error_message = "environment must be one of the following: dev, uat, prod"
  }
}

variable "docker_general_instance_role_name" {
  type = string

}

variable "docker_general_portainer_user_name" {
  type = string

}

variable "route53_zone_name" {
  type = string

}
variable "container_ip" {
  type = string

}
