# Forge: AI Career Accelerator

## About

**Forge** is a premium, AI-powered career acceleration platform for software engineers and students. It provides high-fidelity analysis of resumes, GitHub profiles, and LeetCode activity to help you identify gaps and land FAANG-level interviews.

### Key Value Propositions
- **Know Your Readiness**: Real-time assessment of your interview preparedness across multiple dimensions
- **Deep Technical Analysis**: AI-powered insights on code quality, algorithm mastery, and resume impact
- **Actionable Feedback**: Get specific improvements for your GitHub repos, resume bullets, and ATS compliance
- **Interview Preparation**: Access to a curated interview vault for mastering common patterns

---

## Features

### 🏠 Home Dashboard
- Real-time readiness score aggregating GitHub, LeetCode, and resume metrics
- Visual progress tracking
- Quick access to all analysis tools

### 💻 GitHub Analyzer
- Repository quality assessment
- Code complexity analysis
- README audit and recommendations
- Contributor statistics and consistency scoring

### 🧮 LeetCode Analyzer
- Problem-solving pattern mastery mapping
- Algorithm category breakdown
- Difficulty level progression
- Semantic analysis of problem solutions

### 📄 Resume Analysis
- ATS (Applicant Tracking System) keyword audit
- Impact score calculation
- Bullet point rewriting for maximum effect
- Format and structure suggestions

### ✅ ATS Audit
- Keyword matching against job descriptions
- Compliance scoring
- Formatting recommendations
- Hidden requirements detection

### 🎓 Interview Vault
- Curated problem library
- Pattern-based categorization
- Solution walkthroughs
- Interview question database

### ⚙️ Settings & Profile Management
- Account preferences
- API key management
- Analysis history
- Export capabilities

---

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router v7
- **Icons**: Lucide React
- **AI Engine**: Google Gemini 3 Flash API
- **Package Manager**: npm

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   git clone <repository-url>
   cd forge_-ai-career-accelerator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```
   VITE_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or the port Vite assigns)

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
forge_-ai-career-accelerator/
├── src/
│   ├── App.tsx                          # Main app component with routing
│   ├── geminiService.ts                 # Google Gemini API integration
│   ├── index.tsx                        # React entry point
│   ├── types.ts                         # TypeScript type definitions
│   ├── vite-env.d.ts                    # Vite environment types
│   │
│   ├── pages/                           # Marketing & auth pages
│   │   ├── LandingPage.tsx              # Homepage
│   │   ├── HowItWorks.tsx               # Product explanation
│   │   ├── Pricing.tsx                  # Pricing tiers
│   │   ├── LoginPage.tsx                # User login
│   │   ├── SignupPage.tsx               # User registration
│   │   ├── DemoPage.tsx                 # Demo mode
│   │   │
│   │   └── app/                         # Protected application pages
│   │       ├── AppHome.tsx              # Dashboard
│   │       ├── AppGitHub.tsx            # GitHub analyzer
│   │       ├── AppLeetCode.tsx          # LeetCode analyzer
│   │       ├── AppSemanticAnalysis.tsx  # Code pattern analysis
│   │       ├── AppResume.tsx            # Resume analyzer
│   │       ├── AppATS.tsx               # ATS audit tool
│   │       ├── AppVault.tsx             # Interview vault
│   │       └── AppSettings.tsx          # User settings
│   │
│   ├── index.html                       # HTML entry point
│   ├── metadata.json                    # App metadata
│   ├── package.json                     # Dependencies & scripts
│   ├── tsconfig.json                    # TypeScript configuration
│   └── vite.config.ts                   # Vite configuration
```

---

## Pricing Tiers

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0/month | GitHub basic scan, LeetCode stats, 1 Resume audit/month, Community support |
| **Student** | $7/month | Daily audit updates, Full bullet rewriter, ATS keyword audit, GitHub README audit |
| **Pro** | $15/month | Everything in Student + Interview vault access, Priority analysis, 1-on-1 career guidance |

---

## API Integration

Forge uses the **Google Gemini 3 Flash API** for AI-powered analysis:

- **Resume Analysis**: Extracts ATS scores, impact assessments, and keyword matching
- **GitHub Analysis**: Evaluates code quality, repository complexity, and portfolio strength
- **LeetCode Analysis**: Maps algorithm problem-solving patterns and skill gaps
- **Content Generation**: Provides actionable rewrite suggestions and improvement recommendations

Update your API key in `.env.local` to enable full functionality.

---

## Available Routes

### Public Routes
- `/` - Landing page
- `/how-it-works` - Product features & benefits
- `/pricing` - Pricing page
- `/login` - User login
- `/signup` - User registration
- `/demo/*` - Demo mode (read-only preview)

### Protected Routes (Require Authentication)
- `/app/home` - Dashboard
- `/app/github` - GitHub analyzer
- `/app/leetcode` - LeetCode analyzer
- `/app/leetcode/semantic-analysis` - Pattern analysis
- `/app/resume` - Resume analyzer
- `/app/ats` - ATS audit
- `/app/interview-vault` - Interview vault
- `/app/settings` - Settings & profile

---

## Development Tips

### Hot Module Replacement
Vite provides instant HMR for fast development. Changes to React components reflect immediately without full page refreshes.

### TypeScript Strict Mode
The project uses strict TypeScript checking for type safety. Ensure all types are properly defined before deployment.

### Styling
Uses Tailwind CSS for responsive design. Customize theme in the component classes or extend `tailwind.config.js` if needed.

### Component Animations
Framer Motion handles smooth page transitions and UI animations. The `PageWrapper` component in `App.tsx` wraps all routes with consistent entry/exit animations.

---

## Troubleshooting

### Port Already in Use
If port 5173 is in use, Vite will automatically try the next available port. Check the terminal output for the actual URL.

### API Key Issues
Ensure your `VITE_API_KEY` environment variable is set correctly in `.env.local`. The app requires a valid Gemini API key for analysis features to work.

### Build Errors
Clear the cache and reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is proprietary and confidential. Unauthorized use, distribution, or modification is prohibited.

---

## Support

For support, feature requests, or bug reports, please contact the team or open an issue in the repository.

---

**Built with ❤️ to accelerate your tech career** | Forge - AI Career Accelerator
