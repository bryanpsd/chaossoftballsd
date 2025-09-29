import { useId } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "~/components/Button";
import { concatClasses } from "~/utils/concatClasses";
import { useCaptcha } from "~/utils/useCaptcha";
import "react-toastify/dist/ReactToastify.css";
import * as styles from "~/components/Form/Form.css";

type FormData = {
	name: string;
	email: string;
	message: string;
	"bot-field"?: string;
};

export const Form = () => {
	const captcha = useCaptcha();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted },
		reset,
		getFieldState,
	} = useForm<FormData>({ mode: "onChange" });
	const nameId = useId();
	const emailId = useId();
	const messageId = useId();

	// SSR-safe: check if captcha is ready
	let captchaError: string | null = null;
	let isCaptchaReady = false;
	try {
		isCaptchaReady = captcha && typeof captcha.execute === "function";
	} catch (err) {
		captchaError = `Captcha error: ${String(err)}`;
		console.error(captchaError);
	}

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			let captchaToken = "";
			if (typeof window !== "undefined" && captcha?.execute) {
				captchaToken = await captcha.execute();
			}

			const response = await fetch("/api/contactchaos", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...data, captchaToken }),
			});

			if (response.ok) {
				toast.success("Form submitted successfully!");
				reset();
			} else {
				const { error } = await response.json();
				toast.error(error || "There was a problem submitting the form.");
			}
		} catch (error) {
			toast.error("There was a problem submitting the form. Please try again.");
			console.error("Error sending form:", error);
		}
	};

	// Error fallback for captcha
	if (captchaError) {
		return (
			<div style={{ color: "red" }}>
				Error initializing captcha: {captchaError}
			</div>
		);
	}
	// Only render form when captcha is ready
	if (!isCaptchaReady) {
		return <div>Loading form...</div>;
	}

	return (
		<form
			name="contactchaos"
			className={styles.formWrapper}
			onSubmit={handleSubmit(onSubmit)}
			data-netlify="true"
			data-netlify-honeypot="bot-field"
			noValidate
			method="POST"
		>
			<input type="hidden" name="form-name" value="contactchaos" />
			<input type="hidden" {...register("bot-field")} />

			<div className={styles.formField}>
				<label className={styles.label} htmlFor={nameId}>
					Name:
				</label>
				<div className={styles.inputWrapper}>
					<input
						className={concatClasses([
							styles.input,
							getFieldState("name").isTouched && !errors.name ? "valid" : "",
							(getFieldState("name").isTouched && errors.name) ||
							(isSubmitted && errors.name)
								? "invalid"
								: "",
						])}
						id={nameId}
						type="text"
						{...register("name", { required: true })}
					/>
				</div>
				{errors.name && <span className={styles.error}>Enter a Name</span>}
			</div>

			<div className={styles.formField}>
				<label className={styles.label} htmlFor={emailId}>
					Email:
				</label>
				<div className={styles.inputWrapper}>
					<input
						className={concatClasses([
							styles.input,
							getFieldState("email").isTouched && !errors.email ? "valid" : "",
							(getFieldState("email").isTouched && errors.email) ||
							(isSubmitted && errors.email)
								? "invalid"
								: "",
						])}
						id={emailId}
						type="email"
						{...register("email", {
							required: "Enter an Email address",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Enter a valid email address.",
							},
						})}
					/>
				</div>
				{errors.email && (
					<span className={styles.error}>{errors.email.message}</span>
				)}
			</div>

			<div className={styles.formField}>
				<label className={styles.label} htmlFor={messageId}>
					Message:
				</label>
				<textarea
					className={concatClasses([
						styles.textarea,
						getFieldState("message").isTouched && !errors.message
							? "valid"
							: "",
						(getFieldState("message").isTouched && errors.message) ||
						(isSubmitted && errors.message)
							? "invalid"
							: "",
					])}
					id={messageId}
					{...register("message", { required: "Enter a message." })}
				/>
				{errors.message && (
					<span className={styles.error}>{errors.message.message}</span>
				)}
			</div>
			<div>
				<Button
					className={styles.submitButton}
					type="submit"
					color="primary"
					size="small"
					variant="contained"
				>
					Submit
				</Button>
			</div>
		</form>
	);
};
