# Civic Issue Reporting System - Deployment Guide

## 📋 Prerequisites

- Docker & Docker Compose installed
- Git installed
- Port 8080 (backend), 3306 (MySQL), 5173 (frontend) available

---

## 🚀 Quick Start - Local Deployment with Docker

### **Step 1: Clone Repository**
```bash
git clone https://github.com/Backiyalakshm/Civic-issue-reporting-system-Deployment-.git
cd Civic-issue-reporting-system-Deployment-
```

### **Step 2: Create .env File**
```bash
cp .env.example .env
```

**Edit `.env` and update:**
```env
DB_PASSWORD=your-secure-password-here
JWT_SECRET=your-jwt-secret-key-min-256-bits-long
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### **Step 3: Build & Run with Docker Compose**
```bash
docker-compose up -d
```

**Services will start:**
- 🗄️ MySQL: `localhost:3306`
- 🔙 Backend: `http://localhost:8080`
- 🎨 Frontend: `http://localhost:5173`

### **Step 4: Verify Services**
```bash
# Check all containers are running
docker-compose ps

# View logs
docker-compose logs -f

# Check backend health
curl http://localhost:8080/actuator/health
```

---

## 🛑 Stop Services
```bash
docker-compose down

# Stop and remove volumes (removes database)
docker-compose down -v
```

---

## 🔧 Development Mode

### **Without Docker (Local)**

1. **Start MySQL locally:**
   ```bash
   # Update application.properties with local MySQL credentials
   ```

2. **Build backend:**
   ```bash
   cd civic-governance-fixed\ Backend/civic-governance
   mvn clean package
   java -jar target/civic-governance-1.0.0.jar
   ```

3. **Start frontend:**
   ```bash
   cd civic-governance-fixed\ Frontend/fixed-frontend
   npm install
   npm run dev
   ```

---

## 🌐 Production Deployment

### **Option 1: Deploy to Render + Vercel**

#### **Backend (Render)**
1. Push code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Select your GitHub repo
5. Configure:
   - **Build Command:** `mvn clean package`
   - **Start Command:** `java -jar target/civic-governance-1.0.0.jar`
   - **Environment Variables:**
     ```
     DB_URL=your-production-mysql-url
     DB_USERNAME=prod-user
     DB_PASSWORD=secure-password
     JWT_SECRET=production-jwt-secret
     CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
     ```

#### **Frontend (Vercel)**
1. Go to https://vercel.com
2. Import your GitHub repo (frontend folder)
3. Set environment variable:
   ```
   VITE_API_BASE_URL=https://your-render-backend.onrender.com
   ```
4. Deploy

### **Option 2: AWS Deployment**

#### **Backend on EC2:**
```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@your-instance-ip

# Install Java
sudo apt update && sudo apt install openjdk-17-jre -y

# Copy JAR and run
scp -i your-key.pem target/civic-governance-1.0.0.jar ubuntu@your-instance-ip:/home/ubuntu/

# Start application
java -jar civic-governance-1.0.0.jar
```

#### **Database on RDS:**
- Create MySQL RDS instance
- Update `DB_URL` in environment variables

#### **Frontend on S3 + CloudFront:**
- Upload `dist/` folder to S3
- Create CloudFront distribution
- Update domain settings

### **Option 3: Docker to DigitalOcean / Linode**

```bash
# Build images
docker-compose build

# Push to Docker Hub
docker tag civic-backend:latest your-dockerhub-username/civic-backend:latest
docker push your-dockerhub-username/civic-backend:latest

# Pull on production server and run
docker-compose up -d
```

---

## 🔐 Security Checklist

- ✅ Change default passwords in `.env`
- ✅ Update JWT secret to secure value
- ✅ Enable HTTPS/SSL in production
- ✅ Use strong database password
- ✅ Never commit `.env` file
- ✅ Use environment variables for all secrets
- ✅ Enable firewall rules (only allow necessary ports)
- ✅ Update CORS allowed origins to your domain
- ✅ Set `JPA_SHOW_SQL=false` in production
- ✅ Use HTTPS for all external connections

---

## 📊 Monitoring & Logs

```bash
# View backend logs
docker-compose logs -f backend

# View MySQL logs
docker-compose logs -f mysql-db

# View frontend logs
docker-compose logs -f frontend

# Check application health
curl http://localhost:8080/actuator/health
```

---

## 🐛 Troubleshooting

### **Backend won't connect to MySQL**
```bash
# Check MySQL is running
docker-compose ps

# Check logs
docker-compose logs mysql-db

# Restart MySQL
docker-compose restart mysql-db
```

### **Frontend can't connect to backend**
- Verify `VITE_API_BASE_URL` is correct
- Check CORS settings in `application.properties`
- Ensure backend is running on port 8080

### **Port already in use**
```bash
# Change port in docker-compose.yml
# Or kill process using port:
# Linux/Mac: lsof -ti:8080 | xargs kill -9
# Windows: netstat -ano | findstr :8080
```

---

## 📝 Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `DB_URL` | MySQL connection URL | `jdbc:mysql://mysql-db:3306/civic_system` |
| `DB_USERNAME` | Database user | `root` |
| `DB_PASSWORD` | Database password | `SecurePassword123!` |
| `JWT_SECRET` | JWT signing key | `your-256-bit-secret-key` |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins | `http://localhost:5173` |
| `SERVER_PORT` | Backend port | `8080` |
| `JPA_DDL_AUTO` | Hibernate DDL mode | `update` or `validate` |

---

## 🎯 Next Steps

1. Deploy to production using one of the options above
2. Set up monitoring and alerting
3. Configure backup for MySQL database
4. Set up CI/CD pipeline for automatic deployments
5. Monitor application logs and performance

---

## 📞 Support

For issues or questions, create an issue on GitHub or contact the development team.

---

**Last Updated:** 2026-06-14
**Version:** 1.0.0
