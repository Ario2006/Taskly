import Image from 'next/image';

export default function OwnerCell({ owner }) {
  if (!owner) return <div className="w-10 h-10" />;
  
  return (
    <div className="flex items-center justify-center">
      <Image
        src={`https://avatar.vercel.sh/${owner.email}`}
        alt={owner.name}
        width={36}
        height={36}
        className="rounded-full"
        title={owner.name}
      />
    </div>
  );
}