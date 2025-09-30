# 🌿 Greenery: Your Digital Gardening Companion

**Greenery** is a comprehensive digital platform designed for plant enthusiasts, gardeners, and anyone passionate about sustainable living. This full-stack web application serves as a social network, educational resource, and digital toolkit for all aspects of gardening and plant care.

Built with modern web technologies including **Next.js** for seamless user experience and **PostgreSQL** for robust data management, Greenery integrates multiple APIs and AI-powered features to create an immersive gardening ecosystem.

## 🌐 Tech Stack

### Frontend & Backend
- **Framework**: [Next.js 14.2.5](https://nextjs.org/) (React-based full-stack framework)
- **Styling**: [Tailwind CSS 3.4.1](https://tailwindcss.com/) with custom animations
- **Authentication**: Cookie-based session management with `js-cookie`
- **Image Handling**: Cloudinary integration for media storage

### Database & Infrastructure
- **Database**: [PostgreSQL](https://www.postgresql.org/) with SSL configuration
- **ORM**: Native PostgreSQL client (`pg`)
- **Environment Management**: dotenv for configuration

### APIs & External Services
- **Plant Identification**: [Pl@ntNet API](https://my.plantnet.org/) for AI-powered plant recognition
- **AI Assistant**: [Google Gemini API](https://ai.google.dev/) for intelligent gardening advice
- **Weather Data**: Custom weather API integration for gardening calendar
- **Plant Information**: Trefle API for comprehensive plant database

### Development Tools
- **Validation**: Joi for input validation
- **Security**: bcryptjs for password hashing, DOMPurify for XSS protection
- **File Processing**: Formidable and Multer for file uploads
- **Utilities**: Axios for HTTP requests, date-fns for date manipulation

## 🏗️ Project Structure

```
Greenery_HackCSB_Hackathon_Project/
├── README.md
├── Database/                           # Database schema and scripts
│   ├── Table Creation.sql             # Complete database schema
│   ├── Table Description.txt          # Table relationship documentation
│   ├── importantSQL2.sql             # Sample data and test queries
│   └── sample.txt                    # Additional database notes
└── Nextjs/hackathon-project/         # Main Next.js application
    ├── package.json                  # Dependencies and scripts
    ├── next.config.mjs              # Next.js configuration
    ├── tailwind.config.js           # Tailwind CSS configuration
    ├── postcss.config.mjs           # PostCSS configuration
    ├── jsconfig.json                # JavaScript configuration
    ├── app/                         # Next.js App Router structure
    │   ├── layout.js                # Root layout component
    │   ├── page.js                  # Landing page
    │   ├── globals.css              # Global styles
    │   ├── functions.js             # Utility functions
    │   ├── menubar.js               # Navigation component
    │   ├── (auth)/                  # Authentication routes
    │   │   ├── login/               # User login
    │   │   └── signin/              # User registration
    │   ├── (after-sign-in)/         # Protected routes
    │   │   ├── layout.js            # Authenticated user layout
    │   │   ├── MenuOptions.js       # Navigation menu configuration
    │   │   ├── community/           # Social networking features
    │   │   ├── forum/               # Q&A system
    │   │   ├── harvest/             # Achievement sharing
    │   │   ├── plants/              # Plant database
    │   │   ├── plant-exploration/   # Local species discovery
    │   │   ├── plant-detection/     # AI plant identification
    │   │   ├── plant-journal/       # Personal gardening logs
    │   │   ├── plant-challenge/     # Milestone tracking
    │   │   ├── calender/            # Weather-based planning
    │   │   ├── marketplace/         # Product catalog
    │   │   ├── chat-ai/             # AI assistant
    │   │   ├── newPost/             # Content creation
    │   │   └── profile/             # User management
    │   ├── (articles)/              # Educational content
    │   │   ├── globalwarming/       # Climate change articles
    │   │   ├── plantingtree/        # Tree planting guides
    │   │   ├── temparaturecontrol/  # Climate management
    │   │   └── disastermanagement/  # Emergency preparedness
    │   ├── api/                     # Backend API routes
    │   │   ├── route.js             # Main API router
    │   │   ├── db.js                # Database connection
    │   │   ├── validation.js        # Input validation
    │   │   ├── sanitization.js      # Security utilities
    │   │   ├── plant-identification/ # Plant ID service
    │   │   ├── weatherAPI/          # Weather integration
    │   │   ├── upload-image/        # Image processing
    │   │   └── [various endpoints]  # Feature-specific APIs
    │   └── components/              # Reusable UI components
    │       ├── SearchBar.js         # Search functionality
    │       ├── Filter.js            # Filtering components
    │       ├── ProductGrid.js       # Product display
    │       └── SortBy.js            # Sorting utilities
    └── public/                      # Static assets
        ├── logo.png                 # Application branding
        ├── [1-13].jpg              # Plant images
        ├── user/                    # User profile images
        ├── community/               # Community content
        ├── harvest/                 # Harvest photos
        └── [various icons]          # UI icons and graphics
```

## 📊 Database Schema

The application uses a comprehensive PostgreSQL database with the following key entities:

### Core Tables
- **UserInfo**: User profiles with authentication and location data
- **CompanyInfo**: Business accounts for marketplace vendors
- **PlantInfo**: Comprehensive plant database with descriptions and images
- **Chat**: Real-time messaging system between users

### Social Features
- **Post**: Community posts with plant associations and categorization
- **Harvest**: User achievements and harvest sharing
- **ForumQuestion/ForumAnswer**: Q&A system for plant-related queries
- **ReactXPost/ReactXHarvest/ReactXAnswer**: Reaction system (likes/dislikes)
- **CommentXPost/CommentXHarvest**: Commenting system

### User Engagement
- **UserXPlant**: Tracking user's planted species and quantities
- **Product/UserXProduct/CompanyXProduct**: Marketplace functionality
- **ProductReview**: User feedback and rating system

### Relationships
- Foreign key constraints ensure data integrity across all tables
- Cascade deletions maintain referential consistency
- Timestamp tracking for all user activities

## 🌟 Core Features

### 1. **Community Social Network**
A Facebook-style social platform specifically for gardening enthusiasts.

**Technical Implementation:**
- Real-time post creation with image upload via Cloudinary
- React-based interaction system (likes/dislikes)
- Nested commenting with user mentions
- Plant association for each post
- Content categorization (advice vs. plantation updates)

**Key Files:**
- `app/(after-sign-in)/community/page.js`
- `app/api/insertNewPost.js`
- `app/api/getAllCommunityPosts.js`

### 2. **Q&A Forum System**
Structured knowledge sharing platform for plant-related queries.

**Technical Implementation:**
- Plant-specific question categorization
- Upvoting system for answer quality
- User reputation tracking
- Search functionality across questions and answers

**Key Files:**
- `app/(after-sign-in)/forum/page.js`
- `app/api/addForumQuestion.js`
- `app/api/addForumAnswer.js`

### 3. **Harvest Achievement Sharing**
Platform for showcasing gardening successes and milestones.

**Technical Implementation:**
- Image-centric content sharing
- Plant-specific harvest tracking
- Quantity and quality metrics
- Community engagement through reactions and comments

**Key Files:**
- `app/(after-sign-in)/harvest/page.js`
- `app/api/insertNewHarvest.js`
- `app/api/getAllHarvestPosts.js`

### 4. **AI-Powered Plant Identification**
Machine learning integration for instant plant recognition.

**Technical Implementation:**
- Integration with Pl@ntNet API for scientific accuracy
- Multi-organ identification (leaf, flower, fruit, bark)
- Confidence scoring and alternative suggestions
- Detailed species information retrieval

**Key Files:**
- `app/(after-sign-in)/plant-detection/page.js`
- `app/api/plant-identification/route.js`

### 5. **Intelligent Chat Assistant**
AI-powered gardening advisor using Google Gemini.

**Technical Implementation:**
- Natural language processing for gardening queries
- Context-aware responses with plant care advice
- Markdown rendering for formatted responses
- Chat history persistence

**Key Files:**
- `app/(after-sign-in)/chat-ai/page.js`
- Google Gemini API integration in `app/api/route.js`

### 6. **Weather-Based Gardening Calendar**
16-day weather forecast with gardening activity recommendations.

**Technical Implementation:**
- Location-based weather data for Bangladesh districts
- Activity optimization (watering, fertilizing, pest control)
- Visual weather indicators and recommendations
- Integration with user's plant journal

**Key Files:**
- `app/(after-sign-in)/calender/page.js`
- `app/api/weatherAPI/route.js`

### 7. **Personal Plant Journal**
Digital logging system for tracking plant care activities.

**Technical Implementation:**
- Individual plant tracking with photos and notes
- Growth milestone recording
- Care schedule reminders
- Progress visualization

**Key Files:**
- `app/(after-sign-in)/plant-journal/page.js`
- `app/api/journalFunctions.js`

### 8. **Plant Database & Exploration**
Comprehensive plant information system with local species focus.

**Technical Implementation:**
- Filterable plant database with scientific names
- Bangladesh-specific plant species information
- Detailed care instructions and characteristics
- Image galleries for plant identification

**Key Files:**
- `app/(after-sign-in)/plants/page.js`
- `app/(after-sign-in)/plant-exploration/page.js`
- `app/api/fetchPlantData.js`

### 9. **Marketplace System**
E-commerce functionality for gardening supplies.

**Technical Implementation:**
- Product categorization (plants, tools, fertilizers, pesticides)
- Search and filtering capabilities
- User reviews and ratings
- Company and individual seller support

**Key Files:**
- `app/(after-sign-in)/marketplace/page.js`
- `app/components/ProductGrid.js`
- `app/components/Filter.js`

### 10. **Challenge & Milestone System**
Gamification elements to encourage sustained gardening engagement.

**Technical Implementation:**
- Progressive milestone tracking
- Achievement badges and recognition
- Community challenges and competitions
- Progress visualization and statistics

**Key Files:**
- `app/(after-sign-in)/plant-challenge/page.js`

### 11. **Educational Content Hub**
Environmental awareness and gardening education platform.

**Technical Implementation:**
- Article management system for environmental topics
- Climate change awareness content
- Disaster management and plant-based solutions
- Temperature control and sustainability guides

**Key Files:**
- `app/(articles)/globalwarming/page.js`
- `app/(articles)/plantingtree/page.js`
- `app/(articles)/temparaturecontrol/page.js`
- `app/(articles)/disastermanagement/page.js`

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Cloudinary account for image storage
- API keys for external services

### Environment Variables
Create a `.env.local` file in the `Nextjs/hackathon-project/` directory:

```env
# Database Configuration
PG_USER=your_postgres_user
PG_HOST=your_postgres_host
PG_DATABASE=your_database_name
PG_PASSWORD=your_postgres_password
PG_PORT=5432

# API Keys
PLANTNET_API_KEY=your_plantnet_api_key
GOOGLE_API_KEY=your_google_gemini_api_key
WEATHER_API_KEY=your_weather_api_key
WEATHER_BASE_URL=your_weather_api_base_url

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Database Setup
1. Create a PostgreSQL database
2. Execute the SQL scripts in order:
   ```bash
   psql -U your_user -d your_database -f "Database/Table Creation.sql"
   ```
3. Optionally load sample data:
   ```bash
   psql -U your_user -d your_database -f Database/importantSQL2.sql
   ```

### Application Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/TAR2003/Greenery_HackCSB_Hackathon_Project.git
   cd Greenery_HackCSB_Hackathon_Project/Nextjs/hackathon-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (see above)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## 🚀 Usage Guidelines

### For End Users
1. **Registration**: Create an account through the sign-in page
2. **Profile Setup**: Add your location and gardening interests
3. **Plant Journal**: Start logging your plants and care activities
4. **Community Engagement**: Share posts, ask questions, and connect with other gardeners
5. **Plant Identification**: Use the camera feature to identify unknown plants
6. **Weather Planning**: Check the calendar for optimal gardening activities

### For Developers
1. **API Endpoints**: All backend functionality is accessible through `/api/` routes
2. **Authentication**: User sessions are managed via HTTP-only cookies
3. **Database Access**: Use the `getPool()` function from `app/api/db.js`
4. **Image Uploads**: Implement Cloudinary integration for new features
5. **Validation**: Use Joi schemas for input validation
6. **Security**: Implement XSS protection with DOMPurify

## 🛡️ Security Features

### Input Validation & Sanitization
- **Server-side validation**: Joi schemas for all API endpoints
- **XSS Protection**: DOMPurify for content sanitization
- **SQL Injection Prevention**: Parameterized queries throughout

### Authentication & Authorization
- **Password Security**: bcryptjs hashing with salt
- **Session Management**: Secure cookie-based authentication
- **Route Protection**: Middleware for authenticated routes

### Database Security
- **SSL Connections**: Encrypted database communications
- **Foreign Key Constraints**: Data integrity enforcement
- **Cascade Deletions**: Consistent data cleanup

### File Upload Security
- **Type Validation**: Restricted file types for uploads
- **Size Limits**: Configurable upload size restrictions
- **Virus Scanning**: Integration ready for malware detection

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make changes following the existing code style
4. Test thoroughly with the development database
5. Commit with descriptive messages
6. Push to your fork and create a pull request

### Code Style Guidelines
- Use ES6+ JavaScript features
- Follow Next.js App Router conventions
- Implement proper error handling
- Add JSDoc comments for complex functions
- Use semantic HTML and accessible design patterns

### Testing Guidelines
- Test all API endpoints with various input scenarios
- Verify database transactions and rollbacks
- Check responsive design across device sizes
- Validate form submissions and error states

## 📄 License

This project is developed for educational and hackathon purposes. Please refer to the repository for specific licensing terms.

## 🙏 Acknowledgments

- **APIs**: Pl@ntNet for plant identification, Google Gemini for AI assistance
- **Frameworks**: Next.js team for the excellent full-stack framework
- **Community**: Open source contributors and gardening enthusiasts
- **Hackathon**: HackCSB for providing the platform and inspiration

## 📞 Support

For technical support, feature requests, or contributions:
- Repository: [GitHub](https://github.com/TAR2003/Greenery_HackCSB_Hackathon_Project)
- Issues: Use GitHub Issues for bug reports and feature requests

---

**Greenery** - *Cultivating a sustainable future, one plant at a time* 🌱