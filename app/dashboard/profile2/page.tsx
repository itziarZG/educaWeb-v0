import Link from 'next/link';
import { createClient } from '@utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }
  console.log('USER', user);
  // Fetch the children directly
  const { data: children, error } = await supabase
    .from('hijos')
    .select('nombre, edad, curso, gustos, observaciones')
    .eq('perfil_id', user.id);

  if (error) {
    console.error('Error fetching children:', error);
  }

  if (!children || children.length === 0) {
    redirect('/create-child');
  }

  const userName = user.user_metadata?.name || 'Estudiante';
  // Fallback image handling could be improved, but this keeps existing default
  const userAvatar =
    user.user_metadata?.avatar_url ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDSO01SGULMp02c38TT8XG7J-80B2mbPY8J6Oidfye4QipB3I2ZDgy1wsJOfiYu5a787qDdB8yP88pI_r1lnLY_hjorIQVoh1gtGBHhnBMSefco_CeHo1w1BepKmkGo-d60yj0Lt8vhX1jj52Nq71rIqqzGc3hPuPTIQKAasKfnQ83cNCRQQoMaRUGitvrlm2AG73BYrgt37BvegFdaCLUEwrpyF4QOGhkcNaEOmsyLqiGRsL9W0hnqUUGnSdvxuZ6S31t5qFo_cXuZ';

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-white antialiased">
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] dark:border-[#2a303c] bg-white dark:bg-[#1a202c] px-6 py-3 shadow-sm">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-8 text-primary">
              <span className="material-symbols-outlined text-3xl">school</span>
            </div>
            <h2 className="text-[#111318] dark:text-white text-xl font-bold tracking-tight">
              AI Tutor
            </h2>
          </Link>
          <div className="hidden md:flex items-center relative">
            <span className="material-symbols-outlined absolute left-3 text-[#616f89] dark:text-gray-400 select-none pointer-events-none">
              search
            </span>
            <input
              className="w-64 rounded-lg bg-[#f0f2f4] dark:bg-[#2d3748] border-none py-2 pl-10 pr-4 text-sm text-[#111318] dark:text-white focus:ring-2 focus:ring-primary/50 placeholder:text-[#616f89] dark:placeholder:text-gray-500"
              placeholder="Search topics, courses..."
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6">
            <a
              className="text-[#616f89] hover:text-primary dark:text-[#a0aec0] dark:hover:text-white text-sm font-medium transition-colors"
              href="#"
            >
              Dashboard
            </a>
            <a
              className="text-[#616f89] hover:text-primary dark:text-[#a0aec0] dark:hover:text-white text-sm font-medium transition-colors"
              href="#"
            >
              Courses
            </a>
            <a
              className="text-[#616f89] hover:text-primary dark:text-[#a0aec0] dark:hover:text-white text-sm font-medium transition-colors"
              href="#"
            >
              Community
            </a>
          </nav>
          <div className="flex items-center gap-4 border-l border-[#e5e7eb] dark:border-[#2a303c] pl-6">
            <button className="text-[#616f89] hover:text-primary dark:text-[#a0aec0] transition-colors relative">
              <span className="material-symbols-outlined text-2xl">
                notifications
              </span>
              <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a202c]"></span>
            </button>
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-primary/20 cursor-pointer"
              style={{
                backgroundImage: `url("${userAvatar}")`,
              }}
            ></div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-[#1a202c] border-r border-[#e5e7eb] dark:border-[#2a303c] h-[calc(100vh-65px)] sticky top-[65px] overflow-y-auto">
          <div className="p-6">
            <div className="flex flex-col items-center gap-3 mb-8">
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full size-20 ring-4 ring-primary/10"
                style={{
                  backgroundImage: `url("${userAvatar}")`,
                }}
              ></div>
              <div className="text-center">
                <h3 className="text-[#111318] dark:text-white text-lg font-bold">
                  {userName}
                </h3>
                <p className="text-primary text-sm font-medium">
                  Level 4 Scholar
                </p>
              </div>
            </div>
            <nav className="flex flex-col gap-2">
              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#616f89] dark:text-[#a0aec0] hover:bg-gray-50 dark:hover:bg-[#2d3748] transition-colors group"
                href="#"
              >
                <span className="material-symbols-outlined group-hover:text-primary transition-colors">
                  person
                </span>
                <span className="font-medium">My Profile</span>
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined fill-current">
                  school
                </span>
                <span className="font-medium">Learning Goals</span>
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#616f89] dark:text-[#a0aec0] hover:bg-gray-50 dark:hover:bg-[#2d3748] transition-colors group"
                href="#"
              >
                <span className="material-symbols-outlined group-hover:text-primary transition-colors">
                  smart_toy
                </span>
                <span className="font-medium">AI Configuration</span>
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#616f89] dark:text-[#a0aec0] hover:bg-gray-50 dark:hover:bg-[#2d3748] transition-colors group"
                href="#"
              >
                <span className="material-symbols-outlined group-hover:text-primary transition-colors">
                  notifications
                </span>
                <span className="font-medium">Notifications</span>
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#616f89] dark:text-[#a0aec0] hover:bg-gray-50 dark:hover:bg-[#2d3748] transition-colors group"
                href="#"
              >
                <span className="material-symbols-outlined group-hover:text-primary transition-colors">
                  shield
                </span>
                <span className="font-medium">Security</span>
              </a>
            </nav>
            <div className="mt-auto pt-8">
              <div className="bg-gray-50 dark:bg-[#2d3748] p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    PROFILE COMPLETION
                  </span>
                  <span className="text-xs font-bold text-primary">85%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: '85%' }}
                  ></div>
                </div>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2">
                  Add a bio to reach 100%
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 lg:p-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#111318] dark:text-white tracking-tight">
                  Learning Preferences
                </h1>
                <p className="text-[#616f89] dark:text-[#a0aec0] mt-1 text-base">
                  Customize how your AI tutor interacts with you.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 text-sm font-medium text-[#616f89] bg-white border border-[#e5e7eb] rounded-lg hover:bg-gray-50 dark:bg-[#2d3748] dark:border-[#4a5568] dark:text-white dark:hover:bg-[#4a5568] transition-colors">
                  Cancel
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/30">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Children Section */}
            <section className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm border border-[#e5e7eb] dark:border-[#2a303c] overflow-hidden">
              <div className="border-b border-[#e5e7eb] dark:border-[#2a303c] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                    <span className="material-symbols-outlined">
                      child_care
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#111318] dark:text-white">
                      Children
                    </h3>
                    <p className="text-sm text-[#616f89] dark:text-[#a0aec0]">
                      Manage your children&apos;s profiles.
                    </p>
                  </div>
                </div>
                <button className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-lg">add</span>
                  Add Child
                </button>
              </div>
              <div className="p-6">
                {children && children.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {children.map(
                      (
                        child: {
                          nombre: string;
                          edad: number | null;
                        },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <p className="font-bold text-[#111318] dark:text-white">
                            {child.nombre || 'Child ' + (index + 1)}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {child.edad
                              ? `${child.edad} years old`
                              : 'Age not set'}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                    No children added yet.
                  </div>
                )}
              </div>
            </section>

            <section className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm border border-[#e5e7eb] dark:border-[#2a303c] overflow-hidden">
              <div className="border-b border-[#e5e7eb] dark:border-[#2a303c] px-6 py-4 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111318] dark:text-white">
                    AI Tutor Persona
                  </h3>
                  <p className="text-sm text-[#616f89] dark:text-[#a0aec0]">
                    Adjust the tone and teaching style.
                  </p>
                </div>
              </div>
              <div className="p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-[#111318] dark:text-white">
                      Teaching Style
                    </label>
                    <div className="relative">
                      <select className="w-full appearance-none rounded-lg bg-[#f8fafc] dark:bg-[#2d3748] border border-[#e5e7eb] dark:border-[#4a5568] text-[#111318] dark:text-white px-4 py-2.5 pr-8 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                        <option>Socratic (Ask questions)</option>
                        <option>Direct (Explain concepts)</option>
                        <option>Mentor (Mix of both)</option>
                        <option>Peer (Casual & collaborative)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#616f89] dark:text-gray-400 pointer-events-none text-xl">
                        expand_more
                      </span>
                    </div>
                    <p className="text-xs text-[#616f89] dark:text-[#a0aec0]">
                      Socratic method encourages critical thinking through
                      guided questioning.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-[#111318] dark:text-white">
                      Tone of Voice
                    </label>
                    <div className="relative">
                      <select className="w-full appearance-none rounded-lg bg-[#f8fafc] dark:bg-[#2d3748] border border-[#e5e7eb] dark:border-[#4a5568] text-[#111318] dark:text-white px-4 py-2.5 pr-8 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                        <option>Professional & Academic</option>
                        <option>Friendly & Encouraging</option>
                        <option>Humorous & Light</option>
                        <option>Concise & Technical</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#616f89] dark:text-gray-400 pointer-events-none text-xl">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-2">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-[#111318] dark:text-white">
                        Complexity Level
                      </label>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        Intermediate
                      </span>
                    </div>
                    <input
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                      type="range"
                      min="1"
                      max="5"
                      defaultValue="3"
                    />
                    <div className="flex justify-between text-xs text-[#616f89] dark:text-[#a0aec0] font-medium px-1">
                      <span>Beginner</span>
                      <span>Expert</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-[#111318] dark:text-white">
                        Response Verbosity
                      </label>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        Detailed
                      </span>
                    </div>
                    <input
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                      type="range"
                      min="1"
                      max="3"
                      defaultValue="3"
                    />
                    <div className="flex justify-between text-xs text-[#616f89] dark:text-[#a0aec0] font-medium px-1">
                      <span>Concise</span>
                      <span>Detailed</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm border border-[#e5e7eb] dark:border-[#2a303c] overflow-hidden">
              <div className="border-b border-[#e5e7eb] dark:border-[#2a303c] px-6 py-4 flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-600 dark:text-green-400">
                  <span className="material-symbols-outlined">target</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111318] dark:text-white">
                    Focus Areas
                  </h3>
                  <p className="text-sm text-[#616f89] dark:text-[#a0aec0]">
                    Select topics you want to prioritize this month.
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-3">
                  <label className="cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="peer sr-only"
                    />
                    <div className="px-4 py-2 rounded-full border border-primary bg-primary text-white text-sm font-medium transition-all peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary hover:bg-primary/90">
                      Machine Learning
                    </div>
                  </label>
                  <label className="cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="peer sr-only"
                    />
                    <div className="px-4 py-2 rounded-full border border-primary bg-primary text-white text-sm font-medium transition-all peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary hover:bg-primary/90">
                      Python
                    </div>
                  </label>
                  <label className="cursor-pointer group">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="px-4 py-2 rounded-full border border-[#e5e7eb] dark:border-[#4a5568] bg-white dark:bg-[#2d3748] text-[#616f89] dark:text-[#a0aec0] text-sm font-medium transition-all peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary hover:border-primary/50 dark:hover:border-primary/50">
                      Data Visualization
                    </div>
                  </label>
                  <label className="cursor-pointer group">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="px-4 py-2 rounded-full border border-[#e5e7eb] dark:border-[#4a5568] bg-white dark:bg-[#2d3748] text-[#616f89] dark:text-[#a0aec0] text-sm font-medium transition-all peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary hover:border-primary/50 dark:hover:border-primary/50">
                      Natural Language Processing
                    </div>
                  </label>
                  <label className="cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="peer sr-only"
                    />
                    <div className="px-4 py-2 rounded-full border border-primary bg-primary text-white text-sm font-medium transition-all peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary hover:bg-primary/90">
                      Computer Vision
                    </div>
                  </label>
                  <button className="px-4 py-2 rounded-full border border-dashed border-[#e5e7eb] dark:border-[#4a5568] hover:border-primary text-[#616f89] dark:text-[#a0aec0] hover:text-primary text-sm font-medium transition-all flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      add
                    </span>{' '}
                    Add Topic
                  </button>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm border border-[#e5e7eb] dark:border-[#2a303c] overflow-hidden">
              <div className="border-b border-[#e5e7eb] dark:border-[#2a303c] px-6 py-4 flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111318] dark:text-white">
                    Schedule & Reminders
                  </h3>
                  <p className="text-sm text-[#616f89] dark:text-[#a0aec0]">
                    Manage your daily learning goals.
                  </p>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between p-4 bg-[#f8fafc] dark:bg-[#2d3748] rounded-lg border border-[#e5e7eb] dark:border-[#4a5568]">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-white dark:bg-[#1a202c] flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined">alarm</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#111318] dark:text-white">
                        Daily Reminder
                      </p>
                      <p className="text-sm text-[#616f89] dark:text-[#a0aec0]">
                        Receive a nudge to start your session.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#111318] dark:text-white">
                      Daily Goal (Minutes)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        defaultValue="45"
                        className="w-full rounded-lg bg-[#f8fafc] dark:bg-[#2d3748] border border-[#e5e7eb] dark:border-[#4a5568] text-[#111318] dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                      <span className="absolute right-4 top-2.5 text-sm text-[#616f89] dark:text-[#a0aec0]">
                        mins
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#111318] dark:text-white">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      defaultValue="18:30"
                      className="w-full rounded-lg bg-[#f8fafc] dark:bg-[#2d3748] border border-[#e5e7eb] dark:border-[#4a5568] text-[#111318] dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
