-- 1. classes
CREATE TABLE IF NOT EXISTS classes (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  organization_id text DEFAULT (auth.jwt()->'o'->>'id');
);

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sch Access Classes" ON public.classes 
FOR ALL
TO authenticated
USING (organization_id = (auth.jwt()->'o'->>'id'))
WITH CHECK (organization_id = (auth.jwt()->'o'->>'id'));

-- 2. times
CREATE TABLE IF NOT EXISTS times (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE NOT NULL,
  "order" INT NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

ALTER TABLE times ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sch Access times" ON public.times
FOR ALL
TO authenticated
USING (organization_id = (auth.jwt()->'o'->>'id'))
WITH CHECK (organization_id = (auth.jwt()->'o'->>'id'));

-- 3. producers
CREATE TABLE IF NOT EXISTS producers (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

ALTER TABLE producers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sch Access Producers" ON public.producers 
FOR ALL
TO authenticated
USING (organization_id = (auth.jwt()->'o'->>'id'))
WITH CHECK (organization_id = (auth.jwt()->'o'->>'id'));

-- 4. events
CREATE TABLE IF NOT EXISTS events (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  date DATE NOT NULL,
  name VARCHAR(255) NOT NULL,
  class_id INT NOT NULL,
  time_id INT NOT NULL,
  topic TEXT,
  iscomplete BOOL DEFAULT (false),
  
    FOREIGN KEY (class_id)
    REFERENCES classes(id),
    FOREIGN KEY (producer_id)
    REFERENCES producers(id),
    FOREIGN KEY (time_id)
    REFERENCES times(id)
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sch Access events" ON public.events 
FOR ALL
TO authenticated
USING (organization_id = (auth.jwt()->'o'->>'id'))
WITH CHECK (organization_id = (auth.jwt()->'o'->>'id'));

-- 5. events_producers
CREATE TABLE IF NOT EXISTS events_producers (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  event_id INT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  producer_id INT NOT NULL REFERENCES producers(id),
  organization_id text DEFAULT (auth.jwt()->'o'->>'id')
);

ALTER TABLE events_producers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sch Access events_producers" ON public.events_producers
FOR ALL
TO authenticated
USING (organization_id = (auth.jwt()->'o'->>'id'))
WITH CHECK (organization_id = (auth.jwt()->'o'->>'id'));

-- 6. icons
CREATE TABLE IF NOT EXISTS icons (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL CHECK (char_length(name) > 0),
  organization_id text DEFAULT (auth.jwt()->'o'->>'id')
);

ALTER TABLE icons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sch Access icons" ON public.icons
FOR ALL
TO authenticated
USING (organization_id = (auth.jwt()->'o'->>'id'))
WITH CHECK (organization_id = (auth.jwt()->'o'->>'id'));