export const validateStudent = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email || data.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!data.phone || data.phone.trim() === "") {
    errors.phone = "Phone is required";
  } else if (!/^\d{10}$/.test(data.phone.trim())) {
    errors.phone = "Phone must be exactly 10 digits";
  }

  if (!data.course || data.course.trim() === "") {
    errors.course = "Course is required";
  }

  const age = Number(data.age);
  if (!data.age && data.age !== 0) {
    errors.age = "Age is required";
  } else if (isNaN(age) || age < 18 || age > 30) {
    errors.age = "Age must be between 18 and 30";
  }

  return errors;
};
