import { useRouter } from "next/navigation";
import Image from "next/image";

interface CardProps {
  id: string;
  posterUrl: string;
  title: string;
  releaseYear: number;
  handleDeleteCard: (cardId: string) => void;
}

function Card({
  id,
  posterUrl,
  title,
  releaseYear,
  handleDeleteCard,
}: CardProps) {
  return (
    <div className="relative">
      <button
        className="absolute top-3 right-3 hover:cursor-pointer text-destructive"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleDeleteCard(id);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
      <div className="px-8 pt-8 pb-16 flex flex-col outline-none bg-card rounded-lg hover:cursor-pointer hover:bg-card-hover w-full">
        <Image
          width={500}
          height={500}
          src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${posterUrl}`}
          className="w-full min-h-[250px] h-[250px] lg:min-h-[400px] object-cover rounded-lg"
          alt={title}
        />
        <div className="px-8 flex flex-col justify-center text-primary-foreground text-sm font-medium">
          <div className="leading-8 text-xl font-medium mt-16">{title}</div>
          <div className="text-sm mt-8 leading-6">{releaseYear}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
