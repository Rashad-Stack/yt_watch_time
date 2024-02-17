import { Card } from "flowbite-react";
import BuyPointForm from "./BuyPointForm";

export default function BuyPoint() {
  return (
    <div className="pt-6">
      <Card
        className="max-w-sm"
        imgSrc="https://download.logo.wine/logo/BKash/BKash-Icon2-Logo.wine.png"
        horizontal
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          1 টাকায় 10 পয়েন্ট
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Send money to <b>01871590863</b>
        </p>
        <p className="text-xs font-normal text-gray-500 dark:text-gray-400">
          Helpline : 01758214729
        </p>
      </Card>
      <BuyPointForm />
    </div>
  );
}
