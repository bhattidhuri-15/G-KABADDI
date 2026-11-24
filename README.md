# Circle Style Kabaddi Live Score & Graphics Overlay

## Folder Structure
- `package.json`
- `server.js`
- `public/admin.html` (Controller Link: `/admin`)
- `public/overlay.html` (OBS / vMix Browser Source Link: `/overlay`)

## Render.com Deployment Steps
1. Upload all files inside this folder to a new GitHub repository.
2. Go to [Render.com](https://render.com) -> **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Set **Build Command** to `npm install` and **Start Command** to `node server.js`.
5. Choose **Free** instance and click **Create Web Service**.
