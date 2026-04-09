export const RESOURCES = {
  "sde": {
    courses: [
      { name: "CS50: Introduction to Computer Science", platform: "Harvard / edX", url: "#", free: true, level: "Beginner" },
      { name: "The Odin Project", platform: "theodinproject.com", url: "#", free: true, level: "Beginner" },
      { name: "Full Stack Open", platform: "University of Helsinki", url: "#", free: true, level: "Intermediate" },
      { name: "JavaScript Algorithms & DS", platform: "freeCodeCamp", url: "#", free: true, level: "Intermediate" },
      { name: "System Design Primer", platform: "GitHub", url: "#", free: true, level: "Advanced" },
    ],
    platforms: [
      { name: "LeetCode", type: "DSA Practice", description: "1500+ coding problems", icon: "💡" },
      { name: "GitHub", type: "Version Control", description: "Host and collaborate on code", icon: "🐙" },
      { name: "CodeForces", type: "Competitive Coding", description: "Competitive programming contests", icon: "🏆" },
      { name: "Hackerrank", type: "Skills Cert", description: "Earn verified skill badges", icon: "✅" },
    ],
    projects: [
      { title: "To-Do App", difficulty: "Beginner", tech: "HTML/CSS/JS", duration: "1 week" },
      { title: "Weather Dashboard", difficulty: "Beginner", tech: "JavaScript + API", duration: "1.5 weeks" },
      { title: "E-commerce Store", difficulty: "Intermediate", tech: "React + Node.js", duration: "3 weeks" },
      { title: "Real-time Chat App", difficulty: "Intermediate", tech: "React + Socket.io", duration: "2 weeks" },
      { title: "URL Shortener Service", difficulty: "Advanced", tech: "Node.js + MongoDB", duration: "2 weeks" },
    ]
  },
  "ai-engineer": {
    courses: [
      { name: "Machine Learning Specialization", platform: "Coursera (Andrew Ng)", url: "#", free: false, level: "Beginner" },
      { name: "Fast.ai Practical DL", platform: "fast.ai", url: "#", free: true, level: "Intermediate" },
      { name: "CS231n: CNN for Visual Recognition", platform: "Stanford / YouTube", url: "#", free: true, level: "Advanced" },
      { name: "Hugging Face Course", platform: "Hugging Face", url: "#", free: true, level: "Intermediate" },
      { name: "DeepLearning.AI TensorFlow Dev", platform: "Coursera", url: "#", free: false, level: "Intermediate" },
    ],
    platforms: [
      { name: "Kaggle", type: "ML Competitions", description: "Real datasets + competitions", icon: "📊" },
      { name: "Google Colab", type: "Notebook IDE", description: "Free GPU in the cloud", icon: "🔬" },
      { name: "Hugging Face", type: "Model Hub", description: "Pre-trained models & datasets", icon: "🤗" },
      { name: "Papers With Code", type: "Research", description: "Latest ML papers + code", icon: "📄" },
    ],
    projects: [
      { title: "Spam Email Classifier", difficulty: "Beginner", tech: "Python + scikit-learn", duration: "1 week" },
      { title: "Image Recognition App", difficulty: "Intermediate", tech: "TensorFlow + Gradio", duration: "2 weeks" },
      { title: "Sentiment Analysis Tool", difficulty: "Intermediate", tech: "HuggingFace Transformers", duration: "1.5 weeks" },
      { title: "AI Chatbot (RAG)", difficulty: "Advanced", tech: "LangChain + Pinecone", duration: "3 weeks" },
      { title: "Object Detection System", difficulty: "Advanced", tech: "YOLOv8 + OpenCV", duration: "2.5 weeks" },
    ]
  },
  "data-analyst": {
    courses: [
      { name: "Google Data Analytics Certificate", platform: "Coursera", url: "#", free: false, level: "Beginner" },
      { name: "SQL for Data Science", platform: "Coursera(UC Davis)", url: "#", free: false, level: "Beginner" },
      { name: "Python for Data Analysis", platform: "freeCodeCamp / YouTube", url: "#", free: true, level: "Beginner" },
      { name: "Tableau Desktop Specialist", platform: "Tableau Public", url: "#", free: true, level: "Intermediate" },
    ],
    platforms: [
      { name: "Mode Analytics", type: "SQL + BI", description: "Collaborative SQL environment", icon: "🗄️" },
      { name: "Tableau Public", type: "Visualization", description: "Free data visualization tool", icon: "📈" },
      { name: "Kaggle", type: "Datasets", description: "10,000+ free datasets", icon: "📊" },
      { name: "Google Looker", type: "Business Intel", description: "Enterprise BI dashboards", icon: "👁️" },
    ],
    projects: [
      { title: "COVID-19 Data Dashboard", difficulty: "Beginner", tech: "Python + Tableau", duration: "1 week" },
      { title: "Sales Performance Report", difficulty: "Beginner", tech: "Excel + Power BI", duration: "1 week" },
      { title: "Customer Churn Analysis", difficulty: "Intermediate", tech: "Python + SQL", duration: "2 weeks" },
      { title: "A/B Test Analysis", difficulty: "Intermediate", tech: "Python + Stats", duration: "1.5 weeks" },
    ]
  },
  "cybersecurity": {
    courses: [
      { name: "Google Cybersecurity Certificate", platform: "Coursera", url: "#", free: false, level: "Beginner" },
      { name: "TryHackMe Learning Paths", platform: "TryHackMe", url: "#", free: true, level: "Beginner" },
      { name: "CompTIA Security+ Study Guide", platform: "Professor Messer", url: "#", free: true, level: "Intermediate" },
      { name: "Ethical Hacking Bootcamp", platform: "Udemy (Zaid Sabih)", url: "#", free: false, level: "Intermediate" },
    ],
    platforms: [
      { name: "TryHackMe", type: "Hands-on Labs", description: "Gamified cybersecurity learning", icon: "🎮" },
      { name: "Hack The Box", type: "CTF Challenges", description: "Real-world penetration testing", icon: "📦" },
      { name: "OWASP", type: "Web Security", description: "Top 10 web vulnerabilities", icon: "🌐" },
      { name: "Kali Linux", type: "Pen Test OS", description: "Industry-standard security distro", icon: "🐉" },
    ],
    projects: [
      { title: "Home Lab Setup (VMs)", difficulty: "Beginner", tech: "VirtualBox + Kali", duration: "1 week" },
      { title: "CTF Challenge Write-up", difficulty: "Beginner", tech: "TryHackMe / PicoCTF", duration: "Ongoing" },
      { title: "Vulnerability Scanner", difficulty: "Intermediate", tech: "Python + Nmap", duration: "2 weeks" },
      { title: "Phishing Simulation Tool", difficulty: "Advanced", tech: "GoPhish + Linux", duration: "2 weeks" },
    ]
  },
  "cloud-engineer": {
    courses: [
      { name: "AWS Cloud Practitioner Essentials", platform: "AWS Training (Free)", url: "#", free: true, level: "Beginner" },
      { name: "GCP Fundamentals", platform: "Google Cloud Skills Boost", url: "#", free: true, level: "Beginner" },
      { name: "Docker & Kubernetes Bootcamp", platform: "Udemy (Mumshad)", url: "#", free: false, level: "Intermediate" },
      { name: "Terraform Fundamentals", platform: "HashiCorp Learn", url: "#", free: true, level: "Intermediate" },
    ],
    platforms: [
      { name: "AWS Free Tier", type: "Cloud Platform", description: "12 months free cloud resources", icon: "☁️" },
      { name: "Docker Hub", type: "Container Registry", description: "Public container images", icon: "🐳" },
      { name: "Kubernetes Playground", type: "K8s Practice", description: "Free K8s sandbox", icon: "⚙️" },
      { name: "Terraform Registry", type: "IaC Modules", description: "Ready-made infrastructure code", icon: "🏗️" },
    ],
    projects: [
      { title: "Host Static Website on S3", difficulty: "Beginner", tech: "AWS S3 + CloudFront", duration: "3 days" },
      { title: "Auto-scaling EC2 Setup", difficulty: "Intermediate", tech: "AWS EC2 + ALB", duration: "1 week" },
      { title: "CI/CD Pipeline", difficulty: "Intermediate", tech: "GitHub Actions + Docker", duration: "2 weeks" },
      { title: "Kubernetes Microservices App", difficulty: "Advanced", tech: "K8s + Helm + AWS EKS", duration: "3 weeks" },
    ]
  },
  "ux-designer": {
    courses: [
      { name: "Google UX Design Certificate", platform: "Coursera", url: "#", free: false, level: "Beginner" },
      { name: "Figma Design Course", platform: "Scrimba / YouTube", url: "#", free: true, level: "Beginner" },
      { name: "UX Research Methods", platform: "Nielsen Norman Group", url: "#", free: true, level: "Intermediate" },
      { name: "Design Systems Masterclass", platform: "Udemy", url: "#", free: false, level: "Intermediate" },
    ],
    platforms: [
      { name: "Figma", type: "Design Tool", description: "Industry-standard UI/UX tool", icon: "✏️" },
      { name: "Dribbble", type: "Portfolio", description: "Showcase design work", icon: "🏀" },
      { name: "Useberry", type: "User Testing", description: "Remote usability testing platform", icon: "🧪" },
      { name: "Mobbin", type: "Inspiration", description: "Real app UI patterns library", icon: "📱" },
    ],
    projects: [
      { title: "App Redesign Case Study", difficulty: "Beginner", tech: "Figma", duration: "2 weeks" },
      { title: "Design System Kit", difficulty: "Intermediate", tech: "Figma Components", duration: "2 weeks" },
      { title: "User Research Report", difficulty: "Intermediate", tech: "Interviews + Figma", duration: "3 weeks" },
      { title: "Mobile App Full Prototype", difficulty: "Advanced", tech: "Figma + FigJam", duration: "4 weeks" },
    ]
  },
};

export const getResourcesByCareer = (careerId) => RESOURCES[careerId] || null;
