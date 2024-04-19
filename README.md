### Instructions

1. Clone this repository:

   `https://github.com/EL-BID/bid-safecities-frontend.git`

2. Open the created folder:

   `cd bid-safecities-frontend`

3. Install dependencies:

   `yarn`

4. Run the application:

   `yarn dev`

5. The application will run at:

   `http://localhost:3000/`

6. To run unit tests:

   `yarn test`

#### Run inside container

```console
docker build -t safecities-frontend:latest . -f Dockerfile_dev
cp .env.example .env
# edit env variables
docker network create safecities-network
docker run --name safecities-frontend --network safecities-network --env-file=.env -d -p 3000:3000 safecities-frontend:latest
```