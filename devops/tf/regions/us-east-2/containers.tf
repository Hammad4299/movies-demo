resource "aws_ecr_repository" "movies_demo" {
  name                 = "${local.deployment_name}-movies-demo"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

data "aws_route53_zone" "zone" {
  name = var.route53_zone_name
}
resource "aws_route53_record" "lb-record" {
  allow_overwrite = true
  zone_id         = data.aws_route53_zone.zone.zone_id
  name            = "${local.domain_prefix}.${var.route53_zone_name}"
  type            = "A"
  ttl             = 600
  records         = [var.container_ip]


}
