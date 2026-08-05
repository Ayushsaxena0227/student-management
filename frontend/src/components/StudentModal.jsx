import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createStudent, updateStudent } from "../api/studentApi";
import { validateStudent } from "../utils/validator";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between p-6 sm:px-8 sm:pt-8 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {isEdit ? "Edit Student" : "Add Student"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isEdit
                ? "Update student information and details"
                : "Fill in the details below to register a new student"}
            </p>
          </div>
          <button
            className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors focus:outline-none"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form className="p-6 sm:p-8" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all placeholder-gray-400 ${
                  errors.name
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500"
                }`}
                type="text"
                name="name"
                placeholder="e.g. John Doe"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all placeholder-gray-400 ${
                  errors.email
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500"
                }`}
                type="email"
                name="email"
                placeholder="e.g. john@example.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all placeholder-gray-400 ${
                  errors.phone
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500"
                }`}
                type="tel"
                name="phone"
                placeholder="10-digit number"
                value={form.phone}
                onChange={handleChange}
                maxLength={10}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1.5">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all placeholder-gray-400 ${
                  errors.age
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500"
                }`}
                type="number"
                name="age"
                placeholder="18 - 30"
                value={form.age}
                onChange={handleChange}
                min={18}
                max={30}
              />
              {errors.age && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {errors.age}
                </p>
              )}
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-1.5">
                Course <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all appearance-none ${
                  errors.course
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500"
                }`}
                name="course"
                value={form.course}
                onChange={handleChange}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 0.5rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                }}
              >
                <option value="" disabled>
                  Select a course
                </option>
                {COURSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.course && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {errors.course}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-10 pt-6 border-t border-gray-100">
            <button
              type="button"
              className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors disabled:opacity-50"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
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
