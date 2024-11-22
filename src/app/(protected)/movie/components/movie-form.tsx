"use client";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/useToast";
import { IMovie } from "@/models/movie";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  title: string;
  year: string;
  image: File | string | null;
};

function MovieForm({ movie }: { movie?: IMovie }) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      title: movie?.title || "",
      year: movie?.releaseYear.toString() || "",
      image: movie?.posterImage || null,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    // Request presigned URL
    let url = data.image as string;
    if (data.image instanceof File) {
      url = Date.now() + "-" + data.image?.name;
      const presignedUrlRawData = await fetch("/api/s3/presigned-url", {
        method: "POST",
        body: JSON.stringify({
          objectKey: url,
          operation: "PUT",
          expiresIn: 3600,
        }),
      });
      const { data: presignedUrl } = await presignedUrlRawData.json();
      const uploadedImage = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": data.image?.type || "",
        },
        body: data.image,
      });

      if (!uploadedImage.ok) {
        toast({
          title: "failed to upload image",
          description: "Please try again",
          variant: "destructive",
        });
        return;
      }
    }

    // Add movie information
    if (movie) {
      const updateMovie = await fetch(`/api/movies/${movie._id}`, {
        method: "PUT",
        body: JSON.stringify({
          posterImage: url,
          releaseYear: parseInt(data.year, 10),
          title: data.title,
        }),
      });

      if (updateMovie.ok) {
        toast({
          title: "The Force is Strong! Movie details updated!",
          description: "Like a Jedi mastering their craft, your movie details have been refreshed.",
          variant: "default",
        });
        router.push("/dashboard");
      } else if (updateMovie.status < 500) {
        const body = await updateMovie.json();
        toast({
          title: body?.message,
          variant: "warning",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again",
          variant: "destructive",
        });
      }
      router.replace("/dashboard");
      router.refresh();
    } else {
      const movieResponse = await fetch("/api/movies/add", {
        method: "POST",
        body: JSON.stringify({
          posterImage: url,
          releaseYear: parseInt(data.year, 10),
          title: data.title,
        }),
      });

      if (movieResponse.ok) {
        toast({
          title: "Lights, Camera, Action! Movie added!",
          description: "Like 'The Godfather,' this one's now a part of the family.",
          variant: "default",
        });
        router.replace("/dashboard");
        router.refresh();
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again",
          variant: "destructive",
        });
        console.error("Failed to add movie");
      }
    }
  };

  const handleCancel = () => router.push("/dashboard");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container py-10 lg:py-20"
    >
      <div className="text-primary-foreground font-semibold text-[32px] lg:text-[48px] mb-5 lg:mb-20">
        {movie ? "Edit movie" : "Create a new movie"}
      </div>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <Controller
            name="image"
            rules={{
              required: "Image is required",
            }}
            control={control}
            render={({ field }) => (
              <ImageUpload
                onChange={(file) => {
                  setValue("image", file, { shouldValidate: true });
                }}
                value={typeof field.value === "string" ? null : field.value}
                image={movie?.posterImage}
              />
            )}
          />
          {errors.image && (
            <p className="text-red-500 py-4 text-sm">{errors.image.message}</p>
          )}
        </div>
        <div className="w-full lg:w-1/2 lg:max-w-[375px] mt-[20px]">
          <div className="mb-64">
            <Controller
              name="title"
              control={control}
              rules={{
                required: "Title is required",
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Title"
                  type="text"
                  className={`w-full  ${
                    errors.title ? "ring-2 ring-destructive" : ""
                  }`}
                />
              )}
            />
            {errors.title && (
              <p className="text-red-500 py-4 text-sm">
                {errors.title.message}
              </p>
            )}

            <Controller
              name="year"
              control={control}
              rules={{
                required: "Year is required",
                validate: (value) => {
                  const year = Number(value);
                  const currentYear = new Date().getFullYear(); // Get the current year
                  if (isNaN(year)) return "Year must be a number";
                  if (year <= 1700) return "Year must be greater than 1700";
                  if (year > currentYear) return `Year cannot exceed the current year (${currentYear})`;
                  return true; // Valid
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Publishing year"
                  type="year"
                  className={`w-full mt-24 lg:w-2/4 ${
                    errors.year ? "ring-2 ring-destructive" : ""
                  }`}
                />
              )}
            />
            {errors.year && (
              <p className="text-red-500 py-4 text-sm">{errors.year.message}</p>
            )}
          </div>
          <div className="flex gap-[16px]">
            <Button
              variant="secondary"
              size="sm"
              className="w-1/2"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              loading={isSubmitting}
              disabled={isSubmitting}
              variant="default"
              size="sm"
              className="w-1/2"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default MovieForm;
