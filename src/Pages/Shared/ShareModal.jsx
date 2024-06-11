import toast from 'react-hot-toast';
import { BiLink } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';

const ShareModal = ({ shareUrl, onClose }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-2xl">
                    <IoMdClose />
                </button>
                <h2 className="text-2xl font-bold mb-4">Share this Post</h2>
                <div className="flex items-center space-x-2">
                    <BiLink className="text-2xl" />
                    <input
                        type="text"
                        value={shareUrl}
                        readOnly
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>
                <button
                    onClick={copyToClipboard}
                    className="mt-4 bg-violet-500 text-white px-4 py-2 rounded-lg w-full"
                >
                    Copy Link
                </button>
            </div>
        </div>
    );
};

export default ShareModal;
