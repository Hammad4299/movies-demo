resource "aws_iam_user" "github_actions_iam" {
  name          = "${local.deployment_name}-github-actions"
  path          = "/movies-demo/"
  force_destroy = true
}

data "aws_iam_policy_document" "allow_image_push" {
  statement {
    effect = "Allow"
    actions = [
      "ecr:CompleteLayerUpload",
      "ecr:UploadLayerPart",
      "ecr:InitiateLayerUpload",
      "ecr:BatchCheckLayerAvailability",
      "ecr:PutImage"
    ]
    resources = [aws_ecr_repository.movies_demo.arn]
  }
  statement {
    effect = "Allow"
    actions = [
      "ecr:GetAuthorizationToken",
    ]
    resources = ["*"]
  }
}

resource "aws_iam_user_policy" "allow_image_push" {
  name   = "allow-image-push"
  user   = aws_iam_user.github_actions_iam.name
  policy = data.aws_iam_policy_document.allow_image_push.json
}


data "aws_iam_policy_document" "allow_image_pull" {
  statement {
    effect = "Allow"
    actions = [
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability"
    ]
    resources = [aws_ecr_repository.movies_demo.arn]
  }
  statement {
    effect = "Allow"
    actions = [
      "ecr:GetAuthorizationToken",
    ]
    resources = ["*"]
  }
}

resource "aws_iam_user_policy" "allow_image_pull" {
  name   = "allow-image-pull-movies-demo"
  user   = var.docker_general_portainer_user_name
  policy = data.aws_iam_policy_document.allow_image_pull.json
}


resource "aws_iam_user" "app_user" {
  name          = "${local.deployment_name}-app-user"
  path          = "/movies-demo/"
  force_destroy = true
}


data "aws_iam_policy_document" "allow_s3_access" {
  statement {
    effect = "Allow"

    resources = [
      aws_s3_bucket.s3_bucket.arn,
      "${aws_s3_bucket.s3_bucket.arn}/*"
    ]

    actions = [
      "s3:PutObject",
      "s3:GetObjectAcl",
      "s3:GetObject",
      "s3:ListBucket",
      "s3:PutObjectAcl",
      "s3:GetBucketAcl",
      "s3:DeleteObject"
    ]
  }
}

resource "aws_iam_user_policy" "allow_s3_access" {
  name   = "allow-to-store-uploads"
  user   = aws_iam_user.app_user.name
  policy = data.aws_iam_policy_document.allow_s3_access.json
}
