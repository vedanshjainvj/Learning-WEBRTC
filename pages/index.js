import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');

  const createAndJoin = () => {
    const roomId = uuidv4();
    router.push(`/${roomId}`);
  };

  const joinRoom = () => {
    if (roomId) router.push(`/${roomId}`);
    else {
      alert('Please provide a valid room id');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md p-8 bg-gray-800/90 rounded-2xl shadow-xl backdrop-blur-md">
        <h1 className="text-3xl font-extrabold text-center text-white tracking-wide mb-8">
          Google Meet Clone
        </h1>
        <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 transition duration-200"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e?.target?.value)}
            />
            <button
              onClick={joinRoom}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 shadow-lg transition duration-300"
            >
              Join
            </button>
          </div>

          <div className="flex items-center justify-center text-gray-400">
            <div className="h-px w-1/3 bg-gray-600" />
            <span className="px-2 text-sm font-medium">OR</span>
            <div className="h-px w-1/3 bg-gray-600" />
          </div>

          <button
            onClick={createAndJoin}
            className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 shadow-lg transition duration-300"
          >
            Create a New Room
          </button>
        </div>
      </div>
    </div>
  );
}
