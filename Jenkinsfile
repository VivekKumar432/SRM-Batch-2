// def loadEnvVariables() {
//     def envFile = readFile ''
//     envFile.split('\n').each { line ->
//         if (line.trim()) {
//             def parts = line.split('=')
//             def key = parts[0].trim()
//             def value = parts[1].trim()
//             env[key] = value
//         }
//     }
// }

pipeline {
    agent any

    environment {
        dockerRegistry = 'https://index.docker.io/v1/'
        dockerCreds = credentials('dockerhub-credentials')
        backendImage = 'auth-backend'
        frontendImage = 'auth-frontend'
    }

      
    stages {

         stage('Check .env File') {
            steps {
                script {
                    def envFilePath = 'C://ProgramData//Jenkins//.jenkins//workspace//erp-mern-app pipeline//backend//.env'
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
                    def envFilePath = 'C://ProgramData//Jenkins//.jenkins//workspace//erp-mern-app pipeline//backend//.env'
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
                            // Your steps that require the environment variables
                            echo "Environment variables loaded: ${envVars}"
                            // Place your other steps here
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
                        bat "docker tag ${backendImage}:latest thepurpleaxe/${backendImage}:latest" // Tag image
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
                        bat "docker tag ${frontendImage}:latest thepurpleaxe/${frontendImage}:latest" // Tag image
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
                    docker.withRegistry(dockerRegistry, dockerCreds) {
                        bat "docker push thepurpleaxe/${backendImage}:latest"
                    }
                }
            }
        }

        stage('Push Frontend') {
            steps {
                script {
                    echo "Preparing to push frontend image"
                    docker.withRegistry(dockerRegistry, dockerCreds) {
                        bat "docker push thepurpleaxe/${frontendImage}:latest"
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