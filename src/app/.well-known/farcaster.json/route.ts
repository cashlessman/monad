export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
      header:"eyJmaWQiOjI2ODQzOCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDIxODA4RUUzMjBlREY2NGMwMTlBNmJiMEY3RTRiRkIzZDYyRjA2RWMifQ",
      payload: "eyJkb21haW4iOiJ0ZXN0bmV0LW1vbmFkLnZlcmNlbC5hcHAifQ",
      signature:"MHhhMGUxMmVmOWY2YWFjOGRhNmI0MGViODljMWMwYzY5ZTk4OGM5ZDIyZGU4YTc0YjBmYjQ2MWQyMmUyYTBmNGRiNjg5ZmIxN2RhNTQ0NWU4YTZmNzI1NTAxYWJjNDU4YzE1N2I0NjIzZjZkOTY1MGUyOTEyNDg1MjFjNzQ4ZGMyZjFj",
    },
    frame: {
      version: "1",
      name: "0.69 MON",
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: `${appUrl}?fid=268438&add=0x6100B29a235ebb272F4B10c1964AD9692EE67e13`,
      // imageUrl:  `${appUrl}/cover.png`,  
      buttonTitle: "0.69 MON",
      splashImageUrl: `https://raw.githubusercontent.com/cashlessman/images/refs/heads/main/pfp.png`,
      splashBackgroundColor: "#200052",
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}
