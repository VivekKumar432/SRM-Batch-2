pipeline {
    agent any

    environment {
        dockerRegistry = 'https://registry.hub.docker.com/'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        frontendImage = 'fullstack-frontend'
        backendImage = 'fullstack-backend'
    }

    stages {
        stage('Check .env File') {
            steps {
                script {
                    def envFilePath = 'C:/ProgramData/Jenkins/.jenkins/workspace/user-auth pipeline/backend/.env'
                    if (fileExists(envFilePath)) {
                        echo "The .env file exists. Reading file..."
                    } else {
                        error "The .env file does not exist at path: ${envFilePath}"
                    }
                }
            }
        }

        stage('Load Environment Variables') {
            steps {
                script {
                    def envFilePath = 'C:/ProgramData/Jenkins/.jenkins/workspace/user-auth pipeline/backend/.env'
                    if (fileExists(envFilePath)) {
                        def envContent = readFile(envFilePath)
                        def envVars = envContent.split('\n').collect { line ->
                            if (line.trim()) {
                                def parts = line.split('=')
                                def key = parts[0].trim()
                                def value = parts[1].trim()
                                return "${key}=${value}"
                            }
                        }.findAll { it != null }
                        withEnv(envVars) {
                            echo "Environment variables loaded: ${envVars}"
                        }
                    } else {
                        error "The .env file does not exist at path: ${envFilePath}"
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    def backendPath = 'backend'
                    if (fileExists(backendPath)) {
                        echo "Building backend image"
                        bat "docker build -t ${backendImage}:latest ${backendPath}" // Build the image
                        bat "docker tag ${backendImage} harpreet14/fullstack-backend:fullstack-backend" // Tag image
                    } else {
                        error "Backend directory not found"
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    def frontendPath = 'frontend'
                    if (fileExists(frontendPath)) {
                        echo "Building frontend image"
                        bat "docker build -t ${frontendImage}:latest ${frontendPath}" // Build the image
                        bat "docker tag ${frontendImage} harpreet14/fullstack-frontend:fullstack-frontend" // Tag image
                    } else {
                        error "Frontend directory not found"
                    }
                }
            }
        }

        stage('Push Backend') {
            steps {
                script {
                    echo "Preparing to push backend image"
                    docker.withRegistry(dockerRegistry, 'dockerhub-creds') {
                        bat "docker push harpreet14/fullstack-backend:${backendImage}"
                    }
                }
            }
        }

        stage('Push Frontend') {
            steps {
                script {
                    echo "Preparing to push frontend image"
                    docker.withRegistry(dockerRegistry, 'dockerhub-creds') {
                        bat "docker push harpreet14/fullstack-frontend:${frontendImage}"
                    }
                }
            }
        }
    }

    post {
        always {
            echo "PIPELINE SUCCESS"
        }
        failure {
            echo "PIPELINE FAILED"
        }
    }
}
