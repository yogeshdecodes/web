# Makerlog Next

Next is Makerlog's next generation UI, with server rendering and ReactJS.

# Deployment flow to Elastic Beanstalk

In essence, we have a couple of setups in .ebextensions. Also, we use a .ebignore to override .gitignore. That way build artifacts get sent to the server - it's what we want for fast, zero-downtime deploys.

# Creating a new EB environment

```
# You must first build, otherwise the instance won't work.
yarn build
eb init --platform node.js --region us-east-1 makerlogweb
eb create
# then...
eb deploy
# now: configure SSL https://stackoverflow.com/questions/41352583/elastic-beanstalk-over-ssl-on-cloudflare
```
