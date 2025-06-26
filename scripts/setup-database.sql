-- Crear tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  trading_experience TEXT CHECK (trading_experience IN ('principiante', 'intermedio', 'avanzado', 'experto')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de entradas de journal
CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  trades JSONB DEFAULT '[]',
  emotions JSONB DEFAULT '{}',
  goals TEXT[] DEFAULT '{}',
  learnings TEXT DEFAULT '',
  improvements TEXT DEFAULT '',
  gratitude TEXT DEFAULT '',
  tomorrow_plan TEXT DEFAULT '',
  market_conditions TEXT DEFAULT '',
  session_rating INTEGER CHECK (session_rating >= 1 AND session_rating <= 10) DEFAULT 5,
  total_pnl DECIMAL(10,2) DEFAULT 0,
  trades_count INTEGER DEFAULT 0,
  win_rate DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Crear tabla de objetivos diarios
CREATE TABLE IF NOT EXISTS daily_goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  goals JSONB DEFAULT '[]',
  completed_goals JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Crear tabla de sesiones de meditación
CREATE TABLE IF NOT EXISTS meditation_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  duration_minutes INTEGER NOT NULL,
  technique TEXT NOT NULL,
  mood_before INTEGER CHECK (mood_before >= 1 AND mood_before <= 10),
  mood_after INTEGER CHECK (mood_after >= 1 AND mood_after <= 10),
  notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de evaluaciones de fondeo
CREATE TABLE IF NOT EXISTS funding_evaluations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  evaluation_type TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  target_profit DECIMAL(10,2) NOT NULL,
  max_loss DECIMAL(10,2) NOT NULL,
  current_profit DECIMAL(10,2) DEFAULT 0,
  current_drawdown DECIMAL(10,2) DEFAULT 0,
  status TEXT CHECK (status IN ('active', 'passed', 'failed', 'paused')) DEFAULT 'active',
  trades_data JSONB DEFAULT '[]',
  psychological_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE meditation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_evaluations ENABLE ROW LEVEL SECURITY;

-- Crear políticas de seguridad
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own journal entries" ON journal_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own journal entries" ON journal_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own journal entries" ON journal_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own journal entries" ON journal_entries FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own daily goals" ON daily_goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own daily goals" ON daily_goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own daily goals" ON daily_goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own daily goals" ON daily_goals FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own meditation sessions" ON meditation_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own meditation sessions" ON meditation_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own meditation sessions" ON meditation_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own meditation sessions" ON meditation_sessions FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own funding evaluations" ON funding_evaluations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own funding evaluations" ON funding_evaluations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own funding evaluations" ON funding_evaluations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own funding evaluations" ON funding_evaluations FOR DELETE USING (auth.uid() = user_id);

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear triggers para actualizar updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON journal_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_daily_goals_updated_at BEFORE UPDATE ON daily_goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_funding_evaluations_updated_at BEFORE UPDATE ON funding_evaluations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
