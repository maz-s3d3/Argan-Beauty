CREATE DATABASE argane_maroc;
USE argane_maroc;

-- Table des catégories de produits
CREATE TABLE categories (
    id_categorie INT PRIMARY KEY AUTO_INCREMENT,
    nom_categorie VARCHAR(100) NOT NULL,
    description TEXT
);

-- Table des produits
CREATE TABLE produits (
    id_produit INT PRIMARY KEY AUTO_INCREMENT,
    nom_produit VARCHAR(200) NOT NULL,
    description_courte VARCHAR(255),
    description_complete TEXT,
    prix DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    id_categorie INT,
    origine VARCHAR(100),
    certification VARCHAR(100),
    poids DECIMAL(6,2),
    unite_poids VARCHAR(20),
    image_principale VARCHAR(255),
    date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    est_disponible BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_categorie) REFERENCES categories(id_categorie)
);

-- Table des producteurs/coopératives
CREATE TABLE producteurs (
    id_producteur INT PRIMARY KEY AUTO_INCREMENT,
    nom_cooperative VARCHAR(200) NOT NULL,
    region VARCHAR(100),
    description TEXT,
    certifications VARCHAR(255),
    contact_telephone VARCHAR(20),
    contact_email VARCHAR(100)
);

-- Table de liaison produits-producteurs
CREATE TABLE produit_producteur (
    id_produit INT,
    id_producteur INT,
    PRIMARY KEY (id_produit, id_producteur),
    FOREIGN KEY (id_produit) REFERENCES produits(id_produit),
    FOREIGN KEY (id_producteur) REFERENCES producteurs(id_producteur)
);

-- Table des utilisateurs
CREATE TABLE users (
    id_user INT PRIMARY KEY AUTO_INCREMENT, -- Unique ID for the user
    nom VARCHAR(100) NOT NULL,            -- User's name
    prenom VARCHAR(100) NOT NULL
    numero_telephone VARCHAR(20),         -- User's phone number
    email VARCHAR(100) UNIQUE NOT NULL,   -- Unique email (Gmail, or any other)
    mot_de_passe VARCHAR(255) NOT NULL,   -- Encrypted password
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Registration date
);
-- Table des administrateurs
CREATE TABLE admins (
    id_admin INT PRIMARY KEY AUTO_INCREMENT,     -- Unique ID for the admin
    nom VARCHAR(100) NOT NULL,                  -- Admin's name
    prenom VARCHAR(100) NOT NULL
    email VARCHAR(100) UNIQUE NOT NULL,         -- Unique email for admin
    mot_de_passe VARCHAR(255) NOT NULL,         -- Encrypted password for security
    role VARCHAR(50) DEFAULT 'admin',           -- Role (e.g., admin, super-admin)
    permissions TEXT,                           -- Permissions in JSON or delimited format
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Admin account creation date
    actif BOOLEAN DEFAULT TRUE                  -- Whether the admin account is active
    numero_telephone VARCHAR(20),         -- Admin's phone number

);
-- Table des paniers (cart)
CREATE TABLE cart (
    id_cart INT PRIMARY KEY AUTO_INCREMENT,        -- Unique ID for the cart entry
    id_user INT NOT NULL,                          -- User ID (foreign key from the users table)
    id_produit INT NOT NULL,                       -- Product ID (foreign key from the produits table)
    quantite INT NOT NULL DEFAULT 1,               -- Quantity of the product
    date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date when the product was added to the cart
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE, -- Link to the user
    FOREIGN KEY (id_produit) REFERENCES produits(id_produit) ON DELETE CASCADE -- Link to the product
);
