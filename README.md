# CiviMeter

CiviMeter is an app that empowers community members to report improperly parked cars. By submitting evidence and details of a parking violation, you help promote safer, more organized streets—and earn rewards along the way!

## Features

- **Report Parking Violations**: Snap a photo of a poorly parked car and submit it through the app.
- **AI-Powered Analysis**: Our AI extracts key details like license plate and location.
- **Earn Rewards**: Submit reports and earn points that can be redeemed for exciting rewards like gift cards and prizes.
- **Community Impact**: Contribute to safer neighborhoods and ensure that community resources are used effectively.

## How It Works

1. Snap a photo of a poorly parked car.
2. Our AI extracts key details like license plate and location.
3. Submit the report and earn points instantly.
4. Redeem your points for exciting rewards like gift cards and prizes!

## Why It Matters

CiviMeter encourages responsible parking habits and cleaner streets. By reporting problems, you contribute to safer neighborhoods and ensure that community resources are used effectively. As a reward for your hard work, you can use the parking ticket fees to earn coins, which can be redeemed for gift cards and other exciting prizes. Together, we make a positive impact—one report at a time.

Several cities, including New York City, have proposed or implemented legislation to empower citizens to report parking violations, aiming to improve urban mobility and safety.

### New York City Initiatives

- **Proposed Citizen Reporting Program**: In 2022, Council Member Lincoln Restler introduced a bill that would allow New Yorkers to report illegal parking by submitting photos or videos to the Department of Transportation. If the report led to a ticket, the citizen would receive 25% of the $175 fine.
  - [Read more](https://www.westsidespirit.com/news/bill-would-allow-new-yorkers-to-report-parking-violations-YC2235320)
- **Program Modifications**: By 2023, the bill advanced with modifications. While the financial incentive was removed, the legislation focused on creating an app to facilitate the seamless filing of complaints for illegal parking behavior.
  - [Read more](https://nyc.streetsblog.org/2023/03/03/breaking-citizen-reporting-bill-moves-forward-but-in-a-watered-down-form)

### Similar Programs in Other Cities

- **Los Angeles**: The Los Angeles Department of Transportation (LADOT) has a comprehensive parking enforcement program where traffic officers patrol 24/7 to enforce parking laws. While not citizen-driven, it reflects a commitment to strict parking regulation enforcement.
  - [Read more](https://ladotparking.org/parking-enforcement/)

These initiatives demonstrate a growing trend toward involving citizens in urban management, particularly in reporting parking violations. Such programs aim to enhance compliance with parking regulations, improve traffic flow, and promote safer streets.

## Installation

### Backend (Flask)

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/CiviMeter.git
   ```
2. Navigate to the backend directory:
   ```sh
   cd CiviMeter/backend
   ```
3. Create a virtual environment:
   ```sh
   python -m venv venv
   ```
4. Activate the virtual environment:
   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```sh
     source venv/bin/activate
     ```
5. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
6. Start the Flask server:
   ```sh
   flask run
   ```

### Frontend (React Native)

1. Navigate to the frontend directory:
   ```sh
   cd CiviMeter/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Install `npx` if not already installed:
   ```sh
   npm install -g npx
   ```
4. Start the development server:
   ```sh
   npx expo start
   ```

## API Endpoints

### Upload Photo

- **URL**: `/api/submit_incident`
- **Method**: `POST`
- **Description**: Upload a photo of a parking violation.
- **Parameters**:
  - `image`: The photo of the parking violation.
  - `userId`: The ID of the user submitting the report.
  - `latitude`: The latitude of the location.
  - `longitude`: The longitude of the location.
  - `index`: The incident ID.

### Fetch History

- **URL**: `/api/history`
- **Method**: `POST`
- **Description**: Fetch the history of submitted reports.
- **Parameters**:
  - `userId`: The ID of the user.

### Fetch User Coins

- **URL**: `/api/usercoins`
- **Method**: `POST`
- **Description**: Fetch the number of coins a user has.
- **Parameters**:
  - `userId`: The ID of the user.

### Fetch Gift Cards

- **URL**: `/api/giftcards`
- **Method**: `GET`
- **Description**: Fetch the available gift cards.

### Fetch User Profile

- **URL**: `/api/userprofile`
- **Method**: `POST`
- **Description**: Fetch the user's profile.
- **Parameters**:
  - `userId`: The ID of the user.

### Upload User Profile

- **URL**: `/api/userprofile/upload`
- **Method**: `POST`
- **Description**: Upload the user's profile.
- **Parameters**:
  - `userProfile`: The user's profile data.

### Fetch Locations

- **URL**: `/api/locations`
- **Method**: `GET`
- **Description**: Fetch the locations of reported incidents.

## License

This project is licensed under the MIT License.
