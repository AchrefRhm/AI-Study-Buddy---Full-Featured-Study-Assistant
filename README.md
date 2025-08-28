# 🎓 AI Study Buddy

**Author:** Achref Rhouma

> An intelligent study companion powered by AI to enhance your learning experience with personalized quizzes, flashcards, and progress tracking.

## 🚀 Features

### 🤖 AI Q&A Assistant
Interactive chat interface where students can ask questions and get intelligent responses from the study assistant.

![AI Chat Interface](./images/chat.png)

### 📝 Auto-Generated Quizzes  
Smart quiz generation system that creates multiple-choice questions based on your study topics with instant feedback and explanations.

![Quiz Interface](./images/quiz.png)

### 🔄 Flashcards with Spaced Repetition
Advanced flashcard system implementing spaced repetition algorithm to optimize memory retention and learning efficiency.

![Flashcards System](./images/flashcards.png)

### 📊 Progress Tracking Dashboard
Comprehensive analytics dashboard showing your study progress, performance metrics, and learning trends over time.

![Progress Dashboard](./images/dashboard.png)

### 🏆 Friends Leaderboard
Competitive leaderboard system to track progress among friends and study groups, fostering motivation and engagement.

![Leaderboard](./images/leaderboard.png)

## 🛠️ Tech Stack

| Frontend | Backend | Database | AI Integration |
|----------|---------|----------|----------------|
| ⚛️ **React 18** | 🟢 **Node.js** | 🍃 **MongoDB** | 🧠 **OpenAI API** |
| 🎨 **Tailwind CSS** | 🚂 **Express.js** | 🔧 **Mongoose** | 🤖 **Custom Algorithms** |
| 📱 **Responsive Design** | 🔐 **JWT Auth** | 💾 **Local Storage** | 📚 **NLP Processing** |
| 🎯 **Lucide Icons** | 🌐 **CORS** | ☁️ **Cloud Ready** | 🎲 **Quiz Generation** |

## 🚀 Installation & Setup

### Prerequisites
- 📦 Node.js (v18 or higher)
- 🐛 npm or yarn package manager
- 🍃 MongoDB instance (local or cloud)
- 🔑 OpenAI API key (optional for AI features)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-study-buddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Add your configuration
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_MONGODB_URI=mongodb://localhost:27017/study-buddy
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Demo Usage Guide

### Getting Started
1. 🏠 **Welcome Screen**: Start by exploring the main dashboard
2. 👤 **Profile Setup**: Create your study profile and set learning goals
3. 📚 **Choose Study Mode**: Select from AI Chat, Quizzes, or Flashcards

### AI Chat Assistant
1. 💬 Click on "AI Assistant" from the main menu
2. 🗣️ Type your study questions in natural language
3. 📖 Receive detailed explanations and study guidance
4. 📌 Save important responses for later review

### Quiz Generation
1. 🎯 Navigate to "Quizzes" section
2. 📝 Select your study topic or subject
3. ⚙️ Choose difficulty level and question count
4. 🎮 Take the quiz and get instant feedback
5. 📊 Review your results and explanations

### Flashcard Study
1. 🎴 Go to "Flashcards" section
2. ➕ Create new flashcard sets or use generated ones
3. 🔄 Study using spaced repetition algorithm
4. ✅ Mark cards as "Easy", "Good", or "Hard"
5. 📈 Track your learning progress

### Progress Tracking
1. 📊 Visit your "Dashboard" for analytics
2. 📈 Monitor study streaks and time spent
3. 🎯 View topic mastery and weak areas
4. 📅 Set and track learning goals

### Leaderboard
1. 👥 Add friends by username or email
2. 🏆 View rankings based on study points
3. 🎖️ Compete in weekly challenges
4. 👏 Celebrate achievements together

## 🔧 Configuration Options

### AI Settings
- **Model Selection**: Choose between different AI models
- **Response Length**: Adjust detailed vs. concise answers
- **Subject Focus**: Specify your primary study subjects

### Study Preferences
- **Session Duration**: Set preferred study session length
- **Difficulty Progression**: Auto-adjust question difficulty
- **Reminder Notifications**: Configure study reminders

### Privacy & Data
- **Data Export**: Download your study data anytime
- **Privacy Mode**: Study without leaderboard sharing
- **Backup Settings**: Automatic cloud backup options

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. 🍴 Fork the repository
2. 🌟 Create your feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add some amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔄 Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- 🤖 OpenAI for powering our AI assistant
- 📚 Educational psychology research for spaced repetition algorithms
- 🎨 Design inspiration from modern learning platforms
- 👥 Beta testers and early adopters

## 📞 Support

Need help? Reach out to us:

- 📧 Email: support@studybuddy.ai
- 💬 Discord: [Join our community](https://discord.gg/studybuddy)
- 📖 Documentation: [Full docs](https://docs.studybuddy.ai)
- 🐛 Bug Reports: [GitHub Issues](https://github.com/achref-rhouma/ai-study-buddy/issues)

---

<div align="center">

**Made with ❤️ by Achref Rhouma**

⭐ Star this repo if you find it helpful!

</div>