## Getting Started
To get view this project, you can use the following users to test different roles and functionalities:

### Users

#### Admin
- **Email:** dave@example.com
- **Password:** Dave123
- There isn't date uploaded to this user, the main points you can see is Manage Users where you can see both students and teachers as well as change thier roles

#### Teacher
- **Email:** tim@example.com
- **Password:** Tim123
- Data has been uploaded to this user for you to be able to see the use of: My Activities, Class Manager, and Manage Users where you will see students assigned to the teachers different Class groups

#### Student
- **Email:** sam@example.com
- **Password:** Sam123
- Data has been uploaded for this user so that you can see Speaking Corrections
- To join a Class Group use the following code: 665c7baf869680ba3df6c46f


## Deployment
You can view the live demo of this project on Vercel:

[Live Demo on Vercel](https://project13-frontend.vercel.app/)

## Project Description

**Project13-LearnEnglishWithAI** is designed to assist teachers of English as a second language in creating and assigning activities to class groups. The application provides the following functionalities:

### For Teachers:
- **Class Group Management**: Create and manage class groups, providing students with access to these groups.
- **Activity Assignment**: Assign activities to each group by date.
- **AI-Assisted Material Creation**: Use an AI assistant developed on OpenAI's platform to choose a topic and automatically generate an activity. Alternatively, create an activity from an existing text or video.

### For Students:
- **Speaking Practice**: Integrated AI helps students practice speaking autonomously without needing another person. This is achieved by incorporating Whisper and a custom-made AI assistant from OpenAI. Students receive feedback on their speaking output, allowing them to practice even outside of class.
- **Grammar and Vocabulary Revision**: Use Gap Fill texts to revise specific grammar or vocabulary covered in class. This exercise is similar to those found in many official English exams.
- **Listening Practice**: Watch videos and follow the conversation in a text, filling out missing words. By watching videos of native speakers, students can start understanding natural conversations, which are sometimes not practiced enough with traditional listening activities in class.
- **Feedback and Corrections**: Access previous corrections to review errors and learn from mistakes. This function is simplistic but can be scaled up for more complex interactions.

### Challenges and Future Features:
- **Challenges**: 
  - Setting up the backend and connecting all types of data.
  - Creating correct data structures for use across different pages and ensuring OpenAI sends data in a specific format.
  - Due to this project being deployed in Vercel, the original single function for correcting the speaking task had to be divided up into several functions. First to start the process of calling the API and then to check on the process at intervals of 2 seconds. This is due to the fact that Vercel has a timeout of 10 seconds which makes it unfeesable to use a Async function which would need to work for more than 10 seconds while waiting for a response from openai. 
- **Future Features**:
  - Implementing more complex grammar activities.
  - Introducing speaking practice where students hold short conversations with the AI assistant, requiring new AI assistants.
  - Ensuring the AI assistant sends the correct data structure after each interaction.
  - Improving the speed of data processing and return from OpenAI, requiring further research and testing.
  - Incorporate another openai assistant that on request revises all student corrections for a specific class group and based on the most common error suggests future class work for the teacher to prepare
  - Give the teacher access to the corrections page of all students to allow them to monitor their students progress in the speaking tasks


## Features

The structure of **Project13-LearnEnglishWithAI** can be divided into the following main pages:

### Create Exercise
- **Grammar/Vocabulary Tasks**:
  - Create tasks from existing text or solicit help from the integrated OpenAI API to generate an entire task with answers and explanations.
- **Listening Tasks**:
  - Use a YouTube library to integrate videos. Students listen to the video and complete the task by filling in text based on what they hear in the audio.

### Creation of Activities
- **Activity Composition**:
  - Activities are collections of different exercises. There are three types of exercises: Gap Fill, Video, and Questions.

### Class Manager
- **Class Management**:
  - Create or delete classes.
  - Assign created activities to a class on a specific date, allowing for future planning.
  - Update assigned activities as needed.

### Student's Page
- **Activity Access**:
  - Displays activities assigned to the class for the current date or the most recent date with assigned activities.
  - Students can practice Gap Fill and Video tasks multiple times but can only answer each question once.
  - Oral answers to questions are transcribed and corrected by the AI assistant from OpenAI. Both the answers and corrections are saved.

### Speaking Corrections
- **Review Corrections**:
  - Students can view corrections for the last 10 questions they have answered.

### Manage Users
- **Admin Role**:
  - View all users, divided into students and teachers.
  - Change a student's role to a teacher and vice versa.
- **Teacher Role**:
  - View a dropdown menu of their class groups.
  - When clicking on a specific group, a list of students assigned to that group will be displayed.
- **User Management**:
  - Both admins and teachers can delete users that they can see.
  - View a user card with more information by clicking the "see more" button next to the user's name.

### Join Class
- **Class Enrollment**:
  - Students can join a class group by entering a class ID provided by their teacher (found in Class Manager).
  - Students can switch to a new class by entering another class ID.
  - To test this you can add the following class code: 665c7baf869680ba3df6c46f

  ### Access Control
- **Role-based Access**:
  - Access to pages and functions is controlled by the user's role.
  - **Admin**: Has full access to all functions and is the only user that can assign the role of teacher to a student.
  - **Teacher**: Has all the same abilities as admin except in manage users, where instead of being able to see all users and delete them or change their role, they can only see the students that are signed up to their class groups.
  - **Student**: Only has access to the Student's page and Speaking Corrections, where they will only see information related to the class group they are assigned or to information related to their own account.

   ### UI Design
- **Collaboration**:
- The design of the UI was done on Figma in collaboration with an expert in graphic design and was an ongoing process. In "Acknowledgements" at the end of this page there is a link to the Figma design, and to the designers LinkedIn profile



### Prerequisites
Before you begin, ensure you have met the following requirements:
- **Node.js**: You can download and install Node.js from [Node.js official website](https://nodejs.org/). This will also install npm (Node Package Manager).
- **Git**: You can download and install Git from [Git official website](https://git-scm.com/).

### Installation
Follow these steps to install and set up the project locally:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/project12-learnenglishwithai.git
    ```

2. **Navigate to the project directory:**
    ```sh
    cd project12-learnenglishwithai
    ```

3. **Install dependencies for the frontend:**
    ```sh
    cd frontend
    npm install annyang form-data react react-country-region-selector react-datepicker react-dom react-router-dom react-toastify react-youtube react-slick slick-carousel uuid
    ```

4. **Install dependencies for the backend:**
    ```sh
    cd ../backend
    npm install axios bcryptjs cors dotenv express form-data jsonwebtoken mongoose multer openai
    npm install --save-dev nodemon
    ```

### Configuration
1. **Set up environment variables:**
   - Create a `.env` file in the `backend` directory based on the provided `.env.example` file.
   - Add your OpenAI API key and other necessary configuration details to the `.env` file.

    ```sh
    cp .env.example .env
    ```

    Edit the `.env` file to include your configuration details:
    ```plaintext
    DB_URL=mongodb+<your_mongodb_url>
    OPENAI_API_KEY=<your_openai_api_key>
    OPENAI_SPEAKING_ASSISTANT=<your_openai_speaking_assistant>
    OPENAI_TASK_CREATOR_ASSISTANT=<your_openai_task_creator_assistant>
    ```

### Running the Project
1. **Start the backend server:**
    ```sh
    cd backend
    npm run dev
    ```

2. **Start the frontend development server:**
    ```sh
    cd ../frontend
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:3000`.

By following these steps, you should have the project up and running on your local machine.


## Folder Structure

The project's folder structure is organized as follows:

```plaintext
project12-learnenglishwithai/
├── frontend/
│   ├── initialData/          # Data structures for testing purposes of the frontend
│   ├── node_modules/         # Node.js modules (generated)
│   ├── public/               # Static files such as index.html
│   │   └── assets/           # Static assets like images, fonts, etc.
│   ├── src/                  # Source files for the frontend
│   │   ├── components/       # Reusable React components
│   │   ├── context/          # Context API files
│   │   ├── hooks/            # Custom hooks
│   │   ├── pages/            # Page components
│   │   └── utils/            # Utility functions
│   ├── App.jsx               # Main App component
│   ├── main.jsx              # Entry point of the frontend
│   ├── package.json          # Frontend dependencies and scripts
│   └── vite.config.js        # Vite configuration file
├── backend/
│   ├── node_modules/         # Node.js modules (generated)
│   ├── src/                  # Source files for the backend
│   │   ├── api/              # API-related files
│   │   │   ├── controllers/  # Controllers for handling requests
│   │   │   ├── models/       # Database models
│   │   │   ├── openai/       # OpenAI integration
│   │   │   ├── routes/       # API route handlers
│   │   ├── config/           # Configuration files
│   │   ├── data/             # Data for seeds
│   │   ├── middlewares/      # Middleware functions
│   │   └── utils/            # Utility functions
│   │       ├── seeds/        # Scripts to seed the database
│   │       └── seedFunction.js  # General seed function
│   ├── .env                  # Environment variables
│   ├── index.js              # Entry point of the backend
│   └── package.json          # Backend dependencies and scripts
├── README.md                 # Project documentation
```


## Frontend Scripts

The following scripts are available in the frontend:

- **`npm run dev`**: Starts the development server using Vite.
- **`npm run build`**: Builds the project using Vite.
- **`npm run lint`**: Runs ESLint to check for linting errors.
- **`npm run preview`**: Previews the built project using Vite.


## Backend Scripts

The following scripts are available in the backend:

- **`npm start`**: Starts the server using Node.js.
- **`npm run dev`**: Starts the server using Nodemon for development.
- **`npm run classActivitySeed`**: Seeds the database with class activities data.
- **`npm run classGroupsSeed`**: Seeds the database with class groups data.
- **`npm run classWithActivitiesSeed`**: Seeds the database with classes and activities data.
- **`npm run gapFillTextSeed`**: Seeds the database with gap fill text data.
- **`npm run rulesSeed`**: Seeds the database with rules data.
- **`npm run speakingCorrectionsSeed`**: Seeds the database with speaking corrections data.
- **`npm run userSeed`**: Seeds the database with users data.
- **`npm run videoExerciseSeed`**: Seeds the database with video exercises data.


## Dependencies

### Frontend Dependencies
- `annyang`: ^2.6.1
- `form-data`: ^4.0.0
- `react`: ^18.3.1
- `react-country-region-selector`: ^3.6.1
- `react-datepicker`: ^6.9.0
- `react-dom`: ^18.3.1
- `react-router-dom`: ^6.22.3
- `react-slick`: ^0.30.2
- `react-toastify`: ^10.0.5
- `react-youtube`: ^10.1.0
- `slick-carousel`: ^1.8.1
- `uuid`: ^9.0.1

### Backend Dependencies
- `axios`: ^1.7.2
- `bcryptjs`: ^2.4.3
- `cors`: ^2.8.5
- `dotenv`: ^16.4.5
- `express`: ^4.19.2
- `form-data`: ^4.0.0
- `jsonwebtoken`: ^9.0.0
- `mongoose`: ^8.3.4
- `multer`: ^1.4.5-lts.1
- `openai`: ^4.47.1


## Acknowledgements
Special thanks to Cassandra Brokken https://www.linkedin.com/in/cassandra-brokken-ba416b62/ for their invaluable contributions to the design of the UI.
We collaborated on the design through Figma: https://www.figma.com/design/A0W0njzt89mL8UlNlRTJA5/English%3A-online-language-learning?node-id=0-1&t=ENxSXOg6OAym91KL-1
