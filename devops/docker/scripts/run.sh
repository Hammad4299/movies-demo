# export TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
# export DD_AGENT_HOST=$(curl -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/local-ipv4)

# if [ -z "$DD_AGENT_HOST" ]; then
#     export DD_AGENT_HOST="127.0.0.1"
# fi
# echo "DD_AGENT_HOST=$DD_AGENT_HOST"

echo $@

exec $@
