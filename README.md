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

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/CiviMeter.git
   ```
2. Navigate to the project directory:
   ```sh
   cd CiviMeter
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
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
