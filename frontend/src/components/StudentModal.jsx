import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createStudent, updateStudent } from "../api/studentApi";
import { validateStudent } from "../utils/validators";
import styles from "./StudentModal.module.css";

const COURSES = [
  "Computer Science",
  "Information Technology",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Business Administration",
  "Data Science",
  "Design",
  "Mathematics",
  "Physics",
];

const initialForm = { name: "", email: "", phone: "", course: "", age: "" };

export default function StudentModal({ student, onClose, onSuccess }) {
  const isEdit = Boolean(student);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) {
      setForm({
        name: student.name || "",
        email: student.email || "",
        phone: student.phone || "",
        course: student.course || "",
        age: student.age || "",
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateStudent(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        await updateStudent(student._id, form);
        toast.success("Student updated successfully");
      } else {
        await createStudent(form);
        toast.success("Student added successfully");
      }
      onSuccess();
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      toast.error(msg);
      if (msg.toLowerCase().includes("email")) {
        setErrors((prev) => ({ ...prev, email: "Email already exists" }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle}>
              {isEdit ? "Edit Student" : "Add Student"}
            </h2>
            <p className={styles.modalSubtitle}>
              {isEdit
                ? "Update student information"
                : "Fill in the details to register a student"}
            </p>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label className={styles.label}>
                Full Name <span className={styles.req}>*</span>
              </label>
              <input
                className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                type="text"
                name="name"
                placeholder="e.g. John Doe"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <p className={styles.errorMsg}>{errors.name}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Email Address <span className={styles.req}>*</span>
              </label>
              <input
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                type="email"
                name="email"
                placeholder="e.g. john@example.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className={styles.errorMsg}>{errors.email}</p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Phone Number <span className={styles.req}>*</span>
              </label>
              <input
                className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                type="tel"
                name="phone"
                placeholder="10-digit number"
                value={form.phone}
                onChange={handleChange}
                maxLength={10}
              />
              {errors.phone && (
                <p className={styles.errorMsg}>{errors.phone}</p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Age <span className={styles.req}>*</span>
              </label>
              <input
                className={`${styles.input} ${errors.age ? styles.inputError : ""}`}
                type="number"
                name="age"
                placeholder="18 - 30"
                value={form.age}
                onChange={handleChange}
                min={18}
                max={30}
              />
              {errors.age && <p className={styles.errorMsg}>{errors.age}</p>}
            </div>

            <div className={`${styles.field} ${styles.fieldFull}`}>
              <label className={styles.label}>
                Course <span className={styles.req}>*</span>
              </label>
              <select
                className={`${styles.input} ${styles.select} ${errors.course ? styles.inputError : ""}`}
                name="course"
                value={form.course}
                onChange={handleChange}
              >
                <option value="">Select a course</option>
                {COURSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.course && (
                <p className={styles.errorMsg}>{errors.course}</p>
              )}
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className={styles.btnSpinner} />
                  {isEdit ? "Saving..." : "Adding..."}
                </>
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Add Student"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
