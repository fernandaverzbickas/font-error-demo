# App Organizador

yarn install

npm install -g expo-cli

Development:

yarn start

Read QR Code

## Requirements

node version > 14.0
ios 10+
android 5+

## Testin on Expo

1st Download Expo Client App on device

2nd Run npx expo-optimize (If assets were added or removed)

3rd Run expo publish

4th Read QR Code

- If testing from an Apple device make sure to login on the developer's account, otherwise, won't work.

## Testing on iOS Simulator (In case you don't have access to the developer account)

1st Make sure pods are installed and updated on app-organizador/ios
delete the podfile.lock and Pods folder
pod install

2nd On app organizador build for ios
expo build:ios
Choose build type "Simulator"
On build finished -> Extract .tar

3rd Install app on simulator
xcrun simctl install booted <path-to-app.app>

4th Launch app on simulator
xcrun simctl launch booted br.com.blueticket.organizador

In case the build is not installable and gives an error message of "... is damaged and can't be opened" run: xattr -rd com.apple.quarantine /Users/blueticket/Downloads/app-organizador.app
Repeat 3rd and 4th steps.

In case of crash see log report at User/xxx/Biblioteca(Library)/Logs/DiagnosticReports/BrComBlueticketOrganizador... .crash
