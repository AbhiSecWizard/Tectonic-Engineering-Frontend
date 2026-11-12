import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaArrowRight,
  FaBuilding,
  FaCheckCircle,
  FaExpand,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";

// ==================================================
// API CONFIGURATION
// ==================================================

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

const PROJECT_API = `${API_URL}/api/projects/website`;

// ==================================================
// HELPERS
// ==================================================

const getImageUrl = (image) => {
  if (!image) return "";
  return typeof image === "string" ? image : image.url || "";
};

const getLocation = (location) => {
  if (!location) return "Location not specified";

  return [
    location.city,
    location.state,
    location.country,
  ]
    .filter(Boolean)
    .join(", ") || "Location not specified";
};

// ==================================================
// LOADING COMPONENT
// ==================================================

const ProjectSkeleton = () => (
  <section className="min-h-screen bg-[#F3F5F8] px-4 py-16">
    <div className="mx-auto max-w-7xl animate-pulse">
      <div className="mb-8 h-5 w-40 rounded bg-slate-200" />
      <div className="mb-8 h-12 max-w-xl rounded bg-slate-200" />
      <div className="h-[300px] rounded-2xl bg-slate-200 md:h-[500px]" />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-28 rounded-xl bg-slate-200" />
        ))}
      </div>
    </div>
  </section>
);

// ==================================================
// ERROR COMPONENT
// ==================================================

const ProjectError = ({ message }) => (
  <section className="flex min-h-[70vh] items-center justify-center bg-[#F3F5F8] px-4 py-12">
    <div className="w-full max-w-lg rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center shadow-sm">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500">
        <FaBuilding />
      </div>

      <h2 className="text-2xl font-bold text-[#223F79]">
        Project Not Found
      </h2>

      <p className="mt-3 break-words text-sm leading-7 text-[#64748B]">
        {message}
      </p>

      <Link
        to="/projects"
        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#223F79] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#172B50]"
      >
        <FaArrowLeft />
        Back to Projects
      </Link>
    </div>
  </section>
);

// ==================================================
// MAIN COMPONENT
// ==================================================

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // ==================================================
  // FETCH PROJECT DETAILS
  // GET /api/projects/website/:id
  // ==================================================

  useEffect(() => {
    const controller = new AbortController();

    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");
        setProject(null);

        if (!id) {
          throw new Error("Invalid project ID.");
        }

        const response = await fetch(
          `${PROJECT_API}/${encodeURIComponent(id)}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            signal: controller.signal,
          }
        );

        const contentType = response.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          throw new Error(
            `Server returned a non-JSON response (${response.status}). Check the deployed backend route.`
          );
        }

        const result = await response.json();

        if (!response.ok || !result.success || !result.data) {
          throw new Error(
            result.message || "Unable to fetch project details."
          );
        }

        setProject(result.data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Project Details Error:", err);
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProject();

    return () => controller.abort();
  }, [id]);

  // ==================================================
  // PROJECT DATA
  // ==================================================

  const coverImage = getImageUrl(project?.coverImage);

  const galleryImages = (project?.images || [])
    .map(getImageUrl)
    .filter(Boolean);

  const allImages = [
    ...new Set([coverImage, ...galleryImages].filter(Boolean)),
  ];

  const location = getLocation(project?.location);

  const specifications = [
    { label: "Project Size", value: project?.specs?.size },
    { label: "Number of Floors", value: project?.specs?.floors },
  ].filter((item) => item.value);

  // ==================================================
  // IMAGE LIGHTBOX
  // ==================================================

  const openLightbox = (index) => {
    setActiveImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const changeImage = (direction) => {
    setActiveImage((current) => {
      return (
        (current + direction + allImages.length) %
        allImages.length
      );
    });
  };

  // ==================================================
  // KEYBOARD NAVIGATION
  // ==================================================

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") changeImage(1);
      if (event.key === "ArrowLeft") changeImage(-1);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, allImages.length]);

  // ==================================================
  // LOADING / ERROR
  // ==================================================

  if (loading) return <ProjectSkeleton />;

  if (error || !project) {
    return (
      <ProjectError
        message={error || "This project is unavailable."}
      />
    );
  }

  // ==================================================
  // MAIN UI
  // ==================================================

  return (
    <main className="min-h-screen bg-[#F3F5F8]">

      {/* PROJECT HEADER */}

      <section className="bg-[#172B50]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

          <Link
            to="/projects"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-[#D99A32]"
          >
            <FaArrowLeft />
            Back to Projects
          </Link>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">

              {project.category && (
                <span className="mb-5 inline-flex rounded-full border border-[#D99A32]/40 bg-[#D99A32]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#D99A32]">
                  {project.category}
                </span>
              )}

              <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {project.name}
              </h1>

              {project.structureType && (
                <p className="mt-4 text-lg text-white/70">
                  {project.structureType} Structure
                </p>
              )}

              <p className="mt-4 flex items-center gap-2 text-sm text-white/70">
                <FaMapMarkerAlt className="shrink-0 text-[#D99A32]" />
                {location}
              </p>
            </div>

            {project.status && (
              <span className="w-fit rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white">
                {project.status}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* COVER IMAGE */}

      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {coverImage ? (
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="group relative block h-[280px] w-full overflow-hidden rounded-2xl bg-slate-200 sm:h-[400px] lg:h-[540px]"
          >
            <img
              src={coverImage}
              alt={project.name}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <span className="absolute bottom-5 right-5 flex items-center gap-2 rounded-lg bg-black/60 px-4 py-3 text-sm font-medium text-white backdrop-blur-sm">
              <FaExpand />
              View Image
            </span>
          </button>
        ) : (
          <div className="flex h-[280px] items-center justify-center rounded-2xl bg-slate-200 text-slate-500 sm:h-[400px]">
            <div className="text-center">
              <FaBuilding className="mx-auto mb-3 text-4xl" />
              Project image unavailable
            </div>
          </div>
        )}
      </section>

      {/* PROJECT OVERVIEW */}

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">

        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D99A32]">
            Project Overview
          </span>

          <h2 className="mt-3 text-2xl font-bold text-[#223F79] sm:text-3xl">
            About This Project
          </h2>

          <div className="mt-5 h-1 w-16 rounded-full bg-[#D99A32]" />

          <p className="mt-6 whitespace-pre-line text-base leading-8 text-[#64748B]">
            {project.description || "Project description is not available."}
          </p>

          {/* SERVICES */}

          {project.services?.length > 0 && (
            <div className="mt-12">
              <h3 className="mb-6 text-xl font-bold text-[#223F79]">
                Services Provided
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {project.services.map((service, index) => (
                  <div
                    key={`${service}-${index}`}
                    className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-white p-5"
                  >
                    <FaCheckCircle className="mt-1 shrink-0 text-[#D99A32]" />
                    <span className="text-sm font-medium leading-6 text-[#273444]">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SPECIFICATIONS */}

          {specifications.length > 0 && (
            <div className="mt-12">
              <h3 className="mb-6 text-xl font-bold text-[#223F79]">
                Project Specifications
              </h3>

              <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
                {specifications.map((item, index) => (
                  <div
                    key={item.label}
                    className={`grid gap-2 px-5 py-4 sm:grid-cols-2 ${
                      index !== specifications.length - 1
                        ? "border-b border-[#E2E8F0]"
                        : ""
                    }`}
                  >
                    <span className="text-sm font-semibold text-[#64748B]">
                      {item.label}
                    </span>

                    <span className="text-sm font-medium text-[#273444] sm:text-right">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PROJECT INFORMATION */}

        <aside>
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm lg:sticky lg:top-24">

            <h3 className="text-xl font-bold text-[#223F79]">
              Project Information
            </h3>

            <div className="my-6 h-px bg-[#E2E8F0]" />

            <div className="space-y-6">
              {[
                ["Project Name", project.name],
                ["Category", project.category],
                ["Structure Type", project.structureType],
                ["Location", location],
                ["Status", project.status],
              ]
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                      {label}
                    </p>

                    <p className="mt-2 break-words text-sm font-semibold text-[#273444]">
                      {value}
                    </p>
                  </div>
                ))}
            </div>

            <div className="mt-8 rounded-xl bg-[#F3F5F8] p-5">
              <h4 className="font-bold text-[#223F79]">
                Have a Similar Project?
              </h4>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Talk to our engineering team about your structural engineering requirements.
              </p>

              <Link
                to="/contact"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#223F79] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#D99A32]"
              >
                Contact Us
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </aside>
      </section>

      {/* PROJECT GALLERY */}

      {allImages.length > 1 && (
        <section className="border-t border-[#E2E8F0] bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D99A32]">
              Project Gallery
            </span>

            <h2 className="mt-3 text-2xl font-bold text-[#223F79] sm:text-3xl">
              Project Images
            </h2>

            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {allImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="group relative h-64 overflow-hidden rounded-xl bg-slate-100"
                >
                  <img
                    src={image}
                    alt={`${project.name} - Image ${index + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                    <FaExpand className="text-2xl" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT CTA */}

      <section className="bg-[#223F79] px-4 py-16 text-center sm:px-6">
        <div className="mx-auto max-w-3xl">

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D99A32]">
            Let's Build Together
          </span>

          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Have a Project in Mind?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/70">
            Get in touch with Tectonic Engineering for reliable,
            innovative and precise structural engineering solutions.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#D99A32] px-7 py-4 text-sm font-bold text-[#172B50] transition hover:bg-white"
          >
            Discuss Your Project
            <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* IMAGE LIGHTBOX */}

      {lightboxOpen && allImages.length > 0 && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Project image preview"
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close image"
            className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            <FaTimes />
          </button>

          {allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  changeImage(-1);
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/20"
              >
                <FaArrowLeft />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  changeImage(1);
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/20"
              >
                <FaArrowRight />
              </button>
            </>
          )}

          <img
            src={allImages[activeImage]}
            alt={project.name}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
          />
        </div>
      )}
    </main>
  );
};

export default ProjectDetails;
