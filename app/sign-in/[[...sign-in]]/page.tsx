import Link from 'next/link';
import Image from 'next/image';
import drakelogo from '@/public/drakelogo.webp';
import wicklogo from '@/public/wicklogo.webp';

export default function Page() {
  return (
    <div className="h-screen flex flex-col items-center  bg-yellow-50">
      <div className="h-60 flex items-center">
        <div className="font-family-atomatic text-5xl">Halcyon Media</div>
      </div>
      <div className="flex gap-x-20">
        <div className="flex flex-col gap-4 items-center">
          <div>
            <Link href="/sign-in/drake">
              <div>
                <Image src={drakelogo} alt="Drake logo" height={200} priority />
              </div>
              <div className="bg-teal-800 text-white px-8 mt-4 py-3 rounded text-lg w-48 text-center">
                Drake
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <div>
            <Link href="/sign-in/wicklewood">
              <div>
                <Image
                  src={wicklogo}
                  alt="Wicklewood logo"
                  height={200}
                  priority
                />
              </div>
              <div className="bg-teal-800 text-white px-8 mt-4 py-3 rounded text-lg w-48 text-center">
                Wicklewood
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
