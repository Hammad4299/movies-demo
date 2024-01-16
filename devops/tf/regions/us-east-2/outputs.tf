
output "movies_demo_ecr" {
  value = aws_ecr_repository.movies_demo
}

output "movies_demo_github_user" {
  value = aws_iam_user.github_actions_iam
}
