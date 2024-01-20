# EcommerceFe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Deployment on GCP
--Create a Docker file and yaml file.

--Run the below commands on GCP powerShell where code exist.
--You can upload your code repository on GCP with connecting the account of github.

--Build Docker image
docker build -t your-docker-image-name .

--Tag the Docker image with the GCR repository URL:
docker tag your-docker-image-name gcr.io/your-project-id/your-docker-image-name

--Push the updated Docker image to GCR:
docker push gcr.io/your-project-id/your-docker-image-name

--deploy image in Kubectl
kubectl apply -f ng-deployment.yaml
