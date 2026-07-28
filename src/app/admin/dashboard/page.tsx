"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  LogOut,
  Plus,
  Trash2,
  Eye,
  Home,
  User,
  Code2,
  Briefcase,
  Clock,
  Mail,
  Share2,
  GripVertical,
} from "lucide-react";

type ContentData = Record<string, unknown>;

export default function AdminDashboard() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [activeTab, setActiveTab] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchContent = useCallback(async () => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      const res = await fetch("/api/admin/content", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setContent(data.data);
      }
    } catch {
      console.error("Failed to load content");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      console.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  const updateField = (section: string, field: string, value: unknown) => {
    setContent((prev) => {
      if (!prev) return prev;
      const sectionData = { ...(prev[section] as Record<string, unknown>) };
      sectionData[field] = value;
      return { ...prev, [section]: sectionData };
    });
  };

  const updateArrayItem = (
    section: string,
    index: number,
    field: string,
    value: unknown
  ) => {
    setContent((prev) => {
      if (!prev || !Array.isArray(prev[section])) return prev;
      const arr = [...(prev[section] as Record<string, unknown>[])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [section]: arr };
    });
  };

  const addArrayItem = (section: string, template: Record<string, unknown>) => {
    setContent((prev) => {
      if (!prev || !Array.isArray(prev[section])) return prev;
      const arr = [...(prev[section] as Record<string, unknown>[]), template];
      return { ...prev, [section]: arr };
    });
  };

  const removeArrayItem = (section: string, index: number) => {
    setContent((prev) => {
      if (!prev || !Array.isArray(prev[section])) return prev;
      const arr = (prev[section] as Record<string, unknown>[]).filter(
        (_: unknown, i: number) => i !== index
      );
      return { ...prev, [section]: arr };
    });
  };

  const updateNestedArrayItem = (
    section: string,
    parentIndex: number,
    field: string,
    itemIndex: number,
    value: string
  ) => {
    setContent((prev) => {
      if (!prev || !Array.isArray(prev[section])) return prev;
      const arr = [...(prev[section] as Record<string, unknown>[])];
      const item = { ...arr[parentIndex] };
      const items = [...(item[field] as string[])];
      items[itemIndex] = value;
      item[field] = items;
      arr[parentIndex] = item;
      return { ...prev, [section]: arr };
    });
  };

  const addNestedArrayItem = (
    section: string,
    parentIndex: number,
    field: string
  ) => {
    setContent((prev) => {
      if (!prev || !Array.isArray(prev[section])) return prev;
      const arr = [...(prev[section] as Record<string, unknown>[])];
      const item = { ...arr[parentIndex] };
      const items = [...(item[field] as string[]), ""];
      item[field] = items;
      arr[parentIndex] = item;
      return { ...prev, [section]: arr };
    });
  };

  const removeNestedArrayItem = (
    section: string,
    parentIndex: number,
    field: string,
    itemIndex: number
  ) => {
    setContent((prev) => {
      if (!prev || !Array.isArray(prev[section])) return prev;
      const arr = [...(prev[section] as Record<string, unknown>[])];
      const item = { ...arr[parentIndex] };
      const items = (item[field] as string[]).filter(
        (_: string, i: number) => i !== itemIndex
      );
      item[field] = items;
      arr[parentIndex] = item;
      return { ...prev, [section]: arr };
    });
  };

  const tabs = [
    { id: "hero", label: "Hero", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "experience", label: "Experience", icon: Clock },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "social", label: "Social", icon: Share2 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
      </div>
    );
  }

  if (!content) return null;

  const hero = content.hero as Record<string, string>;
  const about = content.about as Record<string, unknown>;
  const skills = content.skills as Record<string, unknown>[];
  const projects = content.projects as Record<string, unknown>[];
  const experience = content.experience as Record<string, unknown>[];
  const contact = content.contact as Record<string, string>;
  const social = content.social as Record<string, string>;
  const aboutStats = about?.stats as Record<string, string>[];

  return (
    <div className="min-h-screen">
      {/* Admin Top Bar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#050505]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-emerald-500 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-medium text-white/80">CMS Dashboard</h1>
              <p className="text-[11px] text-white/30">Portfolio Admin Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Save status */}
            {saved && (
              <span className="text-[11px] text-emerald-400/80 animate-pulse">
                Saved ✓
              </span>
            )}

            {/* Save button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-[#050505] text-xs font-medium hover:bg-white/90 transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "Saving..." : "Save Changes"}
            </button>

            {/* View site */}
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.06] text-white/50 text-xs hover:bg-white/[0.04] transition-all duration-300"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Site</span>
            </a>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.04] transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Tabs */}
        <nav className="hidden sm:flex flex-col w-56 border-r border-white/[0.04] min-h-[calc(100vh-4rem)] p-3 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white/[0.06] text-white/80"
                    : "text-white/30 hover:text-white/60 hover:bg-white/[0.02]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Tabs */}
        <div className="sm:hidden flex overflow-x-auto gap-2 p-3 border-b border-white/[0.04]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white/[0.06] text-white/80"
                    : "text-white/30"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Hero Section */}
        {activeTab === "hero" && (
          <div className="space-y-6">
            <SectionTitle title="Hero Section" desc="Edit your main hero banner content" />
            <Field label="Greeting Text" value={hero.greeting} onChange={(v) => updateField("hero", "greeting", v)} />
            <Field label="Gradient Text" value={hero.gradientText} onChange={(v) => updateField("hero", "gradientText", v)} />
            <Field label="Ending Text" value={hero.ending} onChange={(v) => updateField("hero", "ending", v)} />
            <Field label="Subtitle" value={hero.subtitle} onChange={(v) => updateField("hero", "subtitle", v)} textarea />
            <Field label="Primary CTA" value={hero.ctaPrimary} onChange={(v) => updateField("hero", "ctaPrimary", v)} />
            <Field label="Secondary CTA" value={hero.ctaSecondary} onChange={(v) => updateField("hero", "ctaSecondary", v)} />
          </div>
        )}

        {/* About Section */}
        {activeTab === "about" && (
          <div className="space-y-6">
            <SectionTitle title="About Section" desc="Edit the About Me content" />
            <Field label="Heading 1" value={about.heading1 as string} onChange={(v) => updateField("about", "heading1", v)} />
            <Field label="Gradient Heading" value={about.gradientHeading as string} onChange={(v) => updateField("about", "gradientHeading", v)} />
            <Field label="Heading 2" value={about.heading2 as string} onChange={(v) => updateField("about", "heading2", v)} />
            <Field label="Paragraph 1" value={about.paragraph1 as string} onChange={(v) => updateField("about", "paragraph1", v)} textarea />
            <Field label="Paragraph 2" value={about.paragraph2 as string} onChange={(v) => updateField("about", "paragraph2", v)} textarea />

            <div className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-white/60">Stats</h3>
                <button
                  onClick={() =>
                    setContent((prev) => {
                      if (!prev) return prev;
                      const a = prev.about as Record<string, unknown>;
                      const stats = [...((a.stats as Record<string, string>[]) || []), { value: "", label: "" }];
                      return { ...prev, about: { ...a, stats } };
                    })
                  }
                  className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Add Stat
                </button>
              </div>
              {aboutStats?.map((stat: Record<string, string>, i: number) => (
                <div key={i} className="flex items-start gap-3 mb-3 group">
                  <GripVertical className="w-4 h-4 text-white/10 mt-3 shrink-0" />
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div>
                      <input
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...aboutStats];
                          newStats[i] = { ...newStats[i], value: e.target.value };
                          updateField("about", "stats", newStats);
                        }}
                        placeholder="Value (e.g. 5+)"
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white/70 placeholder:text-white/15 outline-none focus:border-white/[0.12] transition-all"
                      />
                    </div>
                    <div>
                      <input
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...aboutStats];
                          newStats[i] = { ...newStats[i], label: e.target.value };
                          updateField("about", "stats", newStats);
                        }}
                        placeholder="Label (e.g. Projects)"
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white/70 placeholder:text-white/15 outline-none focus:border-white/[0.12] transition-all"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const newStats = aboutStats.filter((_: unknown, idx: number) => idx !== i);
                      updateField("about", "stats", newStats);
                    }}
                    className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Photo upload hint */}
            <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <h3 className="text-sm font-medium text-white/60 mb-2">About Photo</h3>
              <p className="text-xs text-white/30">
                Place your photo at <code className="text-purple-400/60">public/images/about.jpg</code> (recommended size: 400×500px, aspect ratio 4:5).
                The placeholder gradient will be automatically replaced.
              </p>
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <SectionTitle title="Skills" desc="Manage your skill categories and items" />
            {skills.map((skill: Record<string, unknown>, i: number) => (
              <div key={i} className="relative p-[1px] rounded-xl group">
                <div className="rounded-xl bg-white/[0.02] p-[1px]">
                  <div className="rounded-[calc(0.75rem-1px)] bg-[#050505] p-5 border border-white/[0.04]">
                    <div className="flex items-start justify-between mb-4">
                      <input
                        value={skill.title as string}
                        onChange={(e) => updateArrayItem("skills", i, "title", e.target.value)}
                        placeholder="Skill category name"
                        className="bg-transparent text-sm font-medium text-white/70 outline-none border-b border-transparent focus:border-white/10 pb-1 transition-all w-full"
                      />
                      <button
                        onClick={() => removeArrayItem("skills", i)}
                        className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(skill.items as string[]).map((item: string, j: number) => (
                        <div key={j} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                          <input
                            value={item}
                            onChange={(e) =>
                              updateNestedArrayItem("skills", i, "items", j, e.target.value)
                            }
                            placeholder="Skill item"
                            className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs text-white/60 placeholder:text-white/15 outline-none focus:border-white/[0.12] transition-all"
                          />
                          <button
                            onClick={() => removeNestedArrayItem("skills", i, "items", j)}
                            className="text-white/15 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => addNestedArrayItem("skills", i, "items")}
                      className="mt-3 flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors"
                    >
                      <Plus className="w-3 h-3" /> Add item
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                addArrayItem("skills", {
                  title: "New Category",
                  items: ["New item"],
                })
              }
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-white/[0.08] text-white/30 text-sm hover:border-white/[0.15] hover:text-white/50 transition-all w-full justify-center"
            >
              <Plus className="w-4 h-4" /> Add Skill Category
            </button>
          </div>
        )}

        {/* Projects Section */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <SectionTitle title="Projects" desc="Manage your portfolio projects" />
            {projects.map((project: Record<string, unknown>, i: number) => (
              <div key={i} className="relative p-[1px] rounded-xl group">
                <div className="rounded-xl bg-white/[0.02] p-[1px]">
                  <div className="rounded-[calc(0.75rem-1px)] bg-[#050505] p-5 border border-white/[0.04]">
                    <div className="flex items-start justify-between mb-4">
                      <input
                        value={project.title as string}
                        onChange={(e) => updateArrayItem("projects", i, "title", e.target.value)}
                        placeholder="Project title"
                        className="bg-transparent text-sm font-medium text-white/70 outline-none border-b border-transparent focus:border-white/10 pb-1 transition-all w-full"
                      />
                      <button
                        onClick={() => removeArrayItem("projects", i)}
                        className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <textarea
                      value={project.description as string}
                      onChange={(e) => updateArrayItem("projects", i, "description", e.target.value)}
                      placeholder="Project description"
                      rows={2}
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white/60 placeholder:text-white/15 outline-none focus:border-white/[0.12] transition-all resize-none mb-3"
                    />

                    <div className="flex flex-wrap gap-2 mb-3">
                      {(project.tags as string[]).map((tag: string, j: number) => (
                        <div key={j} className="flex items-center gap-1">
                          <input
                            value={tag}
                            onChange={(e) => updateNestedArrayItem("projects", i, "tags", j, e.target.value)}
                            className="rounded-full px-2.5 py-1 text-[10px] bg-white/[0.04] border border-white/[0.06] text-white/50 outline-none focus:border-white/[0.12] w-20 text-center transition-all"
                          />
                          <button
                            onClick={() => removeNestedArrayItem("projects", i, "tags", j)}
                            className="text-white/15 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addNestedArrayItem("projects", i, "tags")}
                        className="rounded-full px-2.5 py-1 text-[10px] border border-dashed border-white/[0.08] text-white/20 hover:text-white/40 transition-colors"
                      >
                        + tag
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        value={project.href as string}
                        onChange={(e) => updateArrayItem("projects", i, "href", e.target.value)}
                        placeholder="Live URL"
                        className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs text-white/50 placeholder:text-white/15 outline-none focus:border-white/[0.12] transition-all"
                      />
                      <input
                        value={project.github as string}
                        onChange={(e) => updateArrayItem("projects", i, "github", e.target.value)}
                        placeholder="GitHub URL"
                        className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs text-white/50 placeholder:text-white/15 outline-none focus:border-white/[0.12] transition-all"
                      />
                    </div>

                    <label className="flex items-center gap-2 mt-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={project.featured as boolean}
                        onChange={(e) => updateArrayItem("projects", i, "featured", e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-white/20 bg-transparent accent-purple-500"
                      />
                      <span className="text-xs text-white/40">Featured project</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                addArrayItem("projects", {
                  title: "New Project",
                  description: "Project description",
                  tags: ["Tag"],
                  href: "#",
                  github: "#",
                  featured: false,
                })
              }
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-white/[0.08] text-white/30 text-sm hover:border-white/[0.15] hover:text-white/50 transition-all w-full justify-center"
            >
              <Plus className="w-4 h-4" /> Add Project
            </button>
          </div>
        )}

        {/* Experience Section */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            <SectionTitle title="Experience" desc="Manage your work history" />
            {experience.map((exp: Record<string, unknown>, i: number) => (
              <div key={i} className="relative p-[1px] rounded-xl group">
                <div className="rounded-xl bg-white/[0.02] p-[1px]">
                  <div className="rounded-[calc(0.75rem-1px)] bg-[#050505] p-5 border border-white/[0.04]">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 space-y-2">
                        <input
                          value={exp.role as string}
                          onChange={(e) => updateArrayItem("experience", i, "role", e.target.value)}
                          placeholder="Job title"
                          className="bg-transparent text-sm font-medium text-white/70 outline-none border-b border-transparent focus:border-white/10 pb-1 transition-all w-full"
                        />
                        <input
                          value={exp.company as string}
                          onChange={(e) => updateArrayItem("experience", i, "company", e.target.value)}
                          placeholder="Company name"
                          className="bg-transparent text-xs text-white/40 outline-none border-b border-transparent focus:border-white/10 pb-1 transition-all w-full"
                        />
                        <input
                          value={exp.period as string}
                          onChange={(e) => updateArrayItem("experience", i, "period", e.target.value)}
                          placeholder="Period (e.g. 2023 — Present)"
                          className="bg-transparent text-xs text-white/30 outline-none border-b border-transparent focus:border-white/10 pb-1 transition-all w-full"
                        />
                      </div>
                      <button
                        onClick={() => removeArrayItem("experience", i)}
                        className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <textarea
                      value={exp.description as string}
                      onChange={(e) => updateArrayItem("experience", i, "description", e.target.value)}
                      placeholder="Job description"
                      rows={2}
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white/60 placeholder:text-white/15 outline-none focus:border-white/[0.12] transition-all resize-none mb-3"
                    />

                    <div className="space-y-1.5">
                      {(exp.highlights as string[]).map((hl: string, j: number) => (
                        <div key={j} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                          <input
                            value={hl}
                            onChange={(e) =>
                              updateNestedArrayItem("experience", i, "highlights", j, e.target.value)
                            }
                            placeholder="Highlight"
                            className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs text-white/50 placeholder:text-white/15 outline-none focus:border-white/[0.12] transition-all"
                          />
                          <button
                            onClick={() => removeNestedArrayItem("experience", i, "highlights", j)}
                            className="text-white/15 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => addNestedArrayItem("experience", i, "highlights")}
                      className="mt-3 flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors"
                    >
                      <Plus className="w-3 h-3" /> Add highlight
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                addArrayItem("experience", {
                  company: "New Company",
                  role: "Job Title",
                  period: "2024 — Present",
                  description: "Job description",
                  highlights: ["Highlight"],
                })
              }
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-white/[0.08] text-white/30 text-sm hover:border-white/[0.15] hover:text-white/50 transition-all w-full justify-center"
            >
              <Plus className="w-4 h-4" /> Add Experience
            </button>
          </div>
        )}

        {/* Contact Section */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <SectionTitle title="Contact" desc="Edit contact information" />
            <Field label="Email" value={contact.email} onChange={(v) => updateField("contact", "email", v)} />
            <Field label="Location" value={contact.location} onChange={(v) => updateField("contact", "location", v)} />
            <Field label="Form Intro Text" value={contact.formIntro} onChange={(v) => updateField("contact", "formIntro", v)} textarea />
            <Field label="Success Message" value={contact.successMessage} onChange={(v) => updateField("contact", "successMessage", v)} />
          </div>
        )}

        {/* Social Section */}
        {activeTab === "social" && (
          <div className="space-y-6">
            <SectionTitle title="Social Links" desc="Manage your social media URLs" />
            <Field label="GitHub URL" value={social.github} onChange={(v) => updateField("social", "github", v)} />
            <Field label="LinkedIn URL" value={social.linkedin} onChange={(v) => updateField("social", "linkedin", v)} />
            <Field label="Twitter URL" value={social.twitter} onChange={(v) => updateField("social", "twitter", v)} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Sub-components ---------- */

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-medium tracking-tight text-white/80">{title}</h2>
      <p className="text-sm text-white/30 mt-1">{desc}</p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div className="group relative p-[1px] rounded-xl">
      <div className="rounded-xl bg-white/[0.02] p-[1px]">
        <div className="rounded-[calc(0.75rem-1px)] bg-[#050505] p-4 border border-white/[0.04]">
          <label className="block text-xs text-white/40 mb-2 tracking-wide uppercase">
            {label}
          </label>
          {textarea ? (
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              rows={3}
              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white/70 placeholder:text-white/15 outline-none focus:border-white/[0.12] focus:bg-white/[0.05] transition-all resize-none"
            />
          ) : (
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white/70 placeholder:text-white/15 outline-none focus:border-white/[0.12] focus:bg-white/[0.05] transition-all"
            />
          )}
        </div>
      </div>
    </div>
  );
}