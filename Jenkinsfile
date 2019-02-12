pipeline {
    agent any
    stages {
        stage('#1 git') {
            steps {
                git 'https://github.com/brunohafonso95/protractor-intro.git'   
            }
        }
        stage('#2 download dependencies') {
            steps {
                sh 'npm i'
            }
        }
        stage('#3 update drivers') {
            steps {
                sh 'npm run driver-update'
            }
        }
        stage('#4 automated tests') {
            steps {
                sh 'npm run test'
            }
        }
    }
    post {
        always {
            cucumber fileIncludePattern: 'src/**/*.json', sortingMethod: 'ALPHABETICAL'
            junit 'src/**/*.xml'
            script {
                zip archive: true, dir: 'src/reports', glob: '', zipFile: 'evidence-files.zip'
            }
        }
    }
}
