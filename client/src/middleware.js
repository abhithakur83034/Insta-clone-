import {NextResponse} from 'next/server';

export function middleware(request) {
    const url = request.nextUrl.clone();
    const isLogin = request.cookies.get("logged");
  
    if (!isLogin) {
      const loginRequiredPaths = [
        // "/editprofile",
        // "/message",
        "/post",
        "/posts",
        // "/profile",
        "/reels",
        "/sepprofile",
        // "/sepshowfollower",
        "/showfollower",
        "/storie",
        // "/singlepost",
        "/home",
        
      ];
  
      if (loginRequiredPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
        return NextResponse.rewrite(new URL("/", request.url));
      }
    } else {
      const allowedPaths = [
        "/",
        "/signup",
      ];
  
      if (allowedPaths.includes(url.pathname)) {
        return NextResponse.redirect(new URL("/home", request.url));
      }
    }
  
  //   if (request.nextUrl.pathname.startsWith("/components/feedback")) {
  //     return NextResponse.rewrite(new URL("/components/login", request.url));
  //   }
  }