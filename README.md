# Makerlog Next

Next is Makerlog's next generation UI, with server rendering and ReactJS.

# Deployment flow to Elastic Beanstalk

In essence, we have a couple of setups in .ebextensions. Also, we use a .ebignore to override .gitignore. That way build artifacts get sent to the server - it's what we want for fast, zero-downtime deploys.
