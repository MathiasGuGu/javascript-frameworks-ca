import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "../components/form/ErrorMessage";
import Input from "../components/form/Input";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const simulateSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 300);
  };

  const schema = yup.object().shape({
    name: yup.string().min(3).required("Name is required"),
    subject: yup.string().min(3).required("Subject is required"),
    email: yup
      .string()
      .email()
      .matches(/^[\w]+@([\w-])+[\w-]{2,4}$/g, "Invalid Email")
      .required("Email is required"),
    message: yup.string().required("Message is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full h-auto pt-24 flex flex-col items-center justify-center gap-12">
      <section className="w-full h-auto max-w-6xl flex flex-col items-center justify-center ">
        <h1 className=" text-3xl font-light ">Contact</h1>
      </section>
      <section className="w-full h-auto max-w-6xl flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full max-w-3xl"
        >
          <Input
            id="name"
            func={register("name")}
            placeholder="Full Name"
          ></Input>
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

          <Input
            id="subject"
            func={register("subject")}
            placeholder="Subject"
          ></Input>
          {errors.subject && (
            <ErrorMessage>{errors.subject.message}</ErrorMessage>
          )}

          <Input
            id="email"
            func={register("email")}
            placeholder="Email"
          ></Input>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

          <Input
            id="message"
            func={register("message")}
            placeholder="Message"
          ></Input>
          {errors.message && (
            <ErrorMessage>{errors.message.message}</ErrorMessage>
          )}

          <button
            onClick={() => simulateSubmit()}
            className=" bg-blue-500 text-blue-50 w-fit px-12 py-2 rounded-sm"
            type="submit"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin"></Loader2>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
