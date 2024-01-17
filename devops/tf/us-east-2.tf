module "us_east_2" {
  source                             = "./regions/us-east-2"
  deployment_name                    = local.deployment_name
  docker_general_instance_role_name  = data.terraform_remote_state.infrastructure.outputs.us_east_2.docker_general_role.name
  docker_general_portainer_user_name = data.terraform_remote_state.infrastructure.outputs.us_east_2.docker_general_portainer_user.name
  container_ip                       = "3.128.200.223"
  #   container_ip = data.terraform_remote_state.infrastructure.outputs.us_east_2.docker_general_ec2.public_ip

  environment       = var.environment
  route53_zone_name = "teraception.com"
  providers = {
    aws = aws.us-east-2
  }
}
