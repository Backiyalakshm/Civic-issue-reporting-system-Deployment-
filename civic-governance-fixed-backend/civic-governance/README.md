# Civic Governance System - Backend

A Smart Civic Governance and Public Asset Monitoring System built with Spring Boot.

## Prerequisites

Before running this project, make sure you have the following installed:

- **Java 17** or higher
- **Maven 3.6+**
- **MySQL 8.0+**
- **IDE** (VS Code with Java Extension Pack, IntelliJ IDEA, or Eclipse)

## Database Setup

### 1. Install MySQL

If you don't have MySQL installed:
- Download from: https://dev.mysql.com/downloads/mysql/
- Follow the installation wizard
- Set a root password during installation

### 2. Create Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE civic_system;
```

**Note:** The application will automatically create tables when you run it for the first time (due to `spring.jpa.hibernate.ddl-auto=update` setting).

### 3. Configure Database Connection

The database configuration is in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/civic_system?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
```

**Important:** Update the password if your MySQL root password is different!

## Running the Application

### Option 1: Using VS Code

1. **Install Required Extensions:**
   - Extension Pack for Java
   - Spring Boot Extension Pack

2. **Open the Project:**
   - Open VS Code
   - File → Open Folder → Select the `backend` folder

3. **Run the Application:**
   - Open `src/main/java/com/civic/CivicGovernanceApplication.java`
   - Right-click and select "Run Java" or click the "Run" button above the main method
   - OR press `F5` to start debugging

4. **Alternative - Using Terminal:**
   ```bash
   # Navigate to the backend directory
   cd backend
   
   # Clean and build the project
   mvn clean install
   
   # Run the application
   mvn spring-boot:run
   ```

### Option 2: Using IntelliJ IDEA

1. Open IntelliJ IDEA
2. File → Open → Select the `backend` folder
3. Wait for Maven to download dependencies
4. Right-click on `CivicGovernanceApplication.java`
5. Select "Run 'CivicGovernanceApplication'"

### Option 3: Using Command Line (Any OS)

```bash
# Navigate to the backend directory
cd backend

# On Windows
mvnw.cmd clean spring-boot:run

# On macOS/Linux
./mvnw clean spring-boot:run
```

## Verifying the Application

Once the application starts successfully, you should see:

```
Started CivicGovernanceApplication in X.XXX seconds
```

The backend will be running on: **http://localhost:8080**

### Test the API

Open your browser or use Postman/curl to test:

```bash
# Public dashboard endpoint (no authentication required)
curl http://localhost:8080/api/public/dashboard
```

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/civic/
│   │   │   ├── config/          # Security configuration
│   │   │   ├── controller/      # REST API endpoints
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── entity/          # Database entities
│   │   │   ├── repository/      # Data access layer
│   │   │   ├── security/        # JWT authentication
│   │   │   └── service/         # Business logic
│   │   └── resources/
│   │       └── application.properties
│   └── test/                    # Test files
├── pom.xml                      # Maven configuration
└── README.md                    # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Complaints
- `GET /api/complaints/all` - Get all complaints
- `POST /api/complaints/create` - Create new complaint
- `GET /api/complaints/user/{userId}` - Get user's complaints
- `GET /api/complaints/{id}` - Get complaint by ID
- `PUT /api/complaints/{id}/assign` - Assign complaint to officer
- `PUT /api/complaints/{id}/status` - Update complaint status

### Assets
- `GET /api/assets/all` - Get all assets
- `POST /api/assets/create` - Create new asset
- `GET /api/assets/{id}` - Get asset by ID
- `PUT /api/assets/{id}/status` - Update asset status
- `GET /api/assets/{id}/history` - Get maintenance history

### Public (No Authentication Required)
- `GET /api/public/dashboard` - Get public dashboard statistics

### Users
- `GET /api/users/all` - Get all users (Admin only)
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/officers` - Get all officers

### Feedback
- `POST /api/feedback/submit` - Submit feedback
- `GET /api/feedback/all` - Get all feedback
- `GET /api/feedback/average-rating` - Get average rating

## Default User Roles

The system has three user roles:
- **CITIZEN** - Can submit complaints and view their status
- **OFFICER** - Can be assigned complaints and update them
- **ADMIN** - Full system access

## Troubleshooting

### Common Issues:

1. **Port 8080 already in use**
   - Change the port in `application.properties`:
     ```properties
     server.port=8081
     ```

2. **Cannot connect to MySQL**
   - Ensure MySQL service is running
   - Check username and password in `application.properties`
   - Verify MySQL is running on port 3306

3. **Maven dependencies not downloading**
   - Check internet connection
   - Delete `~/.m2/repository` folder and retry
   - Run `mvn clean install -U`

4. **Java version mismatch**
   - This project requires Java 17
   - Check your Java version: `java -version`
   - Update `JAVA_HOME` environment variable if needed

5. **Application won't start**
   - Check the console for error messages
   - Ensure MySQL database is created and running
   - Verify all dependencies are downloaded

### Enable Debug Logging

Add to `application.properties`:
```properties
logging.level.com.civic=DEBUG
logging.level.org.springframework.security=DEBUG
```

## Security

- The application uses JWT (JSON Web Tokens) for authentication
- Passwords are encrypted using BCrypt
- CORS is configured for frontend applications running on localhost:5173 and localhost:3000

## Development

To modify the database schema:
- Update entity classes in `src/main/java/com/civic/entity/`
- The database will auto-update on next application start (due to `ddl-auto=update`)

## Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify MySQL connection and database
3. Ensure all dependencies are properly installed
4. Check that ports are not blocked by firewall

## License

This project is part of a Smart Civic Governance System.
