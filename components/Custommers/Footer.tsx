import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import Image from "next/image";
import GooglePlay from "../../public/images/GooglePlay.png";
import AppStore from "../../public/images/AppStore.png";

export default function Footer() {
  return (
    <footer className="bg-[#000] text-white py-16">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Exclusive</h3>
          <p className="font-semibold mb-4">Subscribe</p>
          <p className="mb-4">Get 10% off your first order</p>
          <form className="flex items-center">
            <Input className="flex-1 mr-2" placeholder="Enter your email" />
            <Button variant="secondary">
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </form>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Support</h3>
          <p className="mb-2">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p className="mb-2">exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Account</h3>
          <p className="mb-2">My Account</p>
          <p className="mb-2">Login / Register</p>
          <p className="mb-2">Cart</p>
          <p className="mb-2">Wishlist</p>
          <p>Shop</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Link</h3>
          <p className="mb-2">Privacy Policy</p>
          <p className="mb-2">Terms Of Use</p>
          <p className="mb-2">FAQ</p>
          <p>Contact</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Download App</h3>
          <p className="mb-4">Save $3 with App New User Only</p>
          <div className="flex space-x-2 mb-4">
            <Image
              alt="Google Play"
              height="40"
              src={GooglePlay}
              style={{
                aspectRatio: "135/40",
                objectFit: "cover",
              }}
              width="135"
            />
            <Image
              alt="App Store"
              height="40"
              src={AppStore}
              style={{
                aspectRatio: "135/40",
                objectFit: "cover",
              }}
              width="135"
            />
          </div>
          <div className="flex space-x-4">
            <FacebookIcon className="w-5 h-5" />
            <TwitterIcon className="w-5 h-5" />
            <InstagramIcon className="w-5 h-5" />
            <LinkedinIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-8 mt-8 border-t border-gray-700 pt-4">
        <p className="text-center text-sm">
          © Copyright Exclusive 2024. All right reserved
        </p>
      </div>
    </footer>
  );
}
