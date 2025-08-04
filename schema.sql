CREATE TABLE Ranks (
    Rank_ID INT PRIMARY KEY AUTO_INCREMENT,
    Rank_Name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Vocations (
    Vocation_ID INT PRIMARY KEY AUTO_INCREMENT,
    Vocation_Name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Appointments (
    Appointment_ID INT PRIMARY KEY AUTO_INCREMENT,
    Appointment_Name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Suppliers (
    Supplier_ID INT PRIMARY KEY AUTO_INCREMENT,
    Supplier_Name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Baskets (
    Basket_ID INT PRIMARY KEY AUTO_INCREMENT,
    Basket_Name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Countries (
    Country_ID INT PRIMARY KEY AUTO_INCREMENT,
    Country_Name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Course_Statuses (
    Status_ID INT PRIMARY KEY AUTO_INCREMENT,
    Status_Name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Modality (
    Modality_ID INT PRIMARY KEY AUTO_INCREMENT,
    Modality_Name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Course (
    Course_ID INT PRIMARY KEY AUTO_INCREMENT,
    Course_Title VARCHAR(255) NOT NULL,
    Supplier_ID INT,
    Basket_ID INT,
    Country_ID INT,
    FOREIGN KEY (Supplier_ID) REFERENCES Suppliers (Supplier_ID),
    FOREIGN KEY (Basket_ID) REFERENCES Baskets (Basket_ID),
    FOREIGN KEY (Country_ID) REFERENCES Countries (Country_ID)
);

CREATE TABLE Personnel (
    Personnel_ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Current_Rank_ID INT,
    Current_Vocation_ID INT,
    Current_Appointment_ID INT,
    FOREIGN KEY (Current_Rank_ID) REFERENCES Ranks (Rank_ID),
    FOREIGN KEY (Current_Vocation_ID) REFERENCES Vocations (Vocation_ID),
    FOREIGN KEY (Current_Appointment_ID) REFERENCES Appointments (Appointment_ID)
);

CREATE TABLE Course_Modality_Junction (
    Course_ID INT NOT NULL,
    Modality_ID INT NOT NULL,
    PRIMARY KEY (Course_ID, Modality_ID),
    FOREIGN KEY (Course_ID) REFERENCES Course (Course_ID),
    FOREIGN KEY (Modality_ID) REFERENCES Modality (Modality_ID)
);

CREATE TABLE Course_Modality_Schedule (
    Schedule_ID INT PRIMARY KEY AUTO_INCREMENT,
    Course_ID INT NOT NULL,
    Modality_ID INT NOT NULL,
    Course_Available_Start_Date DATE NOT NULL,
    Course_Available_End_Date DATE NOT NULL,
    FOREIGN KEY (Course_ID, Modality_ID) REFERENCES Course_Modality_Junction (Course_ID, Modality_ID)
);

CREATE TABLE Personnel_Tracking_Achievements (
    Achievement_Tracking_ID INT PRIMARY KEY AUTO_INCREMENT,
    Personnel_ID INT NOT NULL,
    Achievements TEXT NOT NULL,
    Conferred_Date DATE NOT NULL,
    FOREIGN KEY (Personnel_ID) REFERENCES Personnel (Personnel_ID)
);

CREATE TABLE Personnel_Tracking_Appointment (
    Appointment_Tracking_ID INT PRIMARY KEY AUTO_INCREMENT,
    Personnel_ID INT NOT NULL,
    Appointment_ID INT NOT NULL Conferred_Date DATE NOT NULL,
    FOREIGN KEY (Personnel_ID) REFERENCES Personnel (Personnel_ID),
    FOREIGN KEY (Appointment_ID) REFERENCES Appointments (Appointment_ID)
);

CREATE TABLE Personnel_Tracking_Rank_History (
    Rank_History_ID INT PRIMARY KEY AUTO_INCREMENT,
    Personnel_ID INT NOT NULL,
    Rank_ID INT NOT NULL,
    Start_Date DATE NOT NULL,
    End_Date DATE,
    FOREIGN KEY (Personnel_ID) REFERENCES Personnel (Personnel_ID),
    FOREIGN KEY (Rank_ID) REFERENCES Ranks (Rank_ID)
);

CREATE TABLE Personnel_Course_History (
    Enrollment_ID INT PRIMARY KEY AUTO_INCREMENT,
    Personnel_ID INT NOT NULL,
    Schedule_ID INT NOT NULL,
    Status_ID INT NOT NULL,
    Completion_Date DATE,
    FOREIGN KEY (Personnel_ID) REFERENCES Personnel (Personnel_ID),
    FOREIGN KEY (Schedule_ID) REFERENCES Course_Modality_Schedule (Schedule_ID),
    FOREIGN KEY (Status_ID) REFERENCES Course_Statuses (Status_ID)
);