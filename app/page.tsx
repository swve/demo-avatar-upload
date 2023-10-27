"use client";
import { useState, useRef } from 'react';
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { CheckCircle, FileWarning } from 'lucide-react';
import ReactConfetti from 'react-confetti';

export default function Home() {
  const [isImage, setIsImage] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [borderColor, setBorderColor] = useState('green');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file.type.startsWith('image/')) {
      setIsImage(true);
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setBorderColor('green');
      setTimeout(() => {
        setBorderColor('white');
      }, 1000);
    } else {
      setIsImage(false);
    }
  }



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className={`border-2 border-dashed ${isImage ? 'border-green-500' : isImage === false ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800'} p-6 rounded-md w-full max-w-sm`}>
        <div className="flex flex-col items-center space-y-4">
          {isImage ? (
            <>
            <ReactConfetti
              numberOfPieces={isImage ? 1400 : 0}
              recycle={false}
              className="w-full h-screen"
            />
              <img className={`rounded-full border-8 shadow-lg w-[100px] h-[100px] transition-colors duration-1000 ease-in-out ${borderColor === 'green' ? 'border-green-500' : 'border-white'}`} src={imageUrl} alt="Uploaded Image" />
              <CheckCircle className="w-8 h-8 text-green-500 dark:text-green-400" />
            </>
          ) : isImage === false ? (
            <FileWarning className="w-8 h-8 text-red-500 dark:text-red-400" />
          )
            : (
              <svg
                className=" w-8 h-8 text-zinc-500 dark:text-zinc-400"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
            )}
          <div className="flex items-center text-center space-x-2 hover:cursor-pointer">
            <Input className='cursor-pointer' ref={fileInputRef} id="file-upload" type="file" onChange={handleFileUpload} />
          </div>
        </div>
      </Card>
    </main>
  )
}
